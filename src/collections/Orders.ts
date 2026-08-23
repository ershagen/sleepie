import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'email', 'total', 'createdAt'],
    description:
      'Sätt status till "Återbetald" för att återbetala via Mollie och försöka avbryta CJ-ordern (innan den skickats).',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req, context }) => {
        if (operation !== 'update') return doc
        if (context?.skipRefundHook) return doc

        const prevStatus = previousDoc?.status
        const nextStatus = doc?.status
        if (nextStatus !== 'refunded' || prevStatus === 'refunded') return doc
        if (doc?.mollieRefundId) return doc

        try {
          // Dynamic import so Payload admin bundle stays light
          const { refundOrderByNumber } = await import('../../lib/refund')
          const result = await refundOrderByNumber(String(doc.orderNumber), {
            reason: doc.refundReason || 'Återbetalning via Payload admin',
            amountSek: doc.refundAmount || doc.total,
          })
          req.payload.logger.info({
            msg: '[orders:refund]',
            order: doc.orderNumber,
            result,
          })
        } catch (e) {
          req.payload.logger.error({
            msg: '[orders:refund:error]',
            error: e instanceof Error ? e.message : e,
          })
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending',
          value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Återbetald (refund)', value: 'refunded' },
      ],
      admin: {
        description:
          'Välj "Återbetald" → Mollie refund + CJ cancel körs automatiskt.',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'text' },
    { name: 'zip', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'country', type: 'text', defaultValue: 'SE' },
    { name: 'subtotal', type: 'number' },
    { name: 'shipping', type: 'number' },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    { name: 'paymentMethod', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'productId', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'quantity', type: 'number' },
      ],
    },
    {
      name: 'molliePaymentId',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'mollieRefundId',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'refundAmount',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Valfritt delbelopp (kr). Tom = hela ordern.',
      },
    },
    {
      name: 'refundReason',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'refundNote',
      type: 'textarea',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'cjOrderId',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'cjCancelled',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'trackingNumber',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
}
