import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'email', 'total', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
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
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
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
      name: 'cjOrderId',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'trackingNumber',
      type: 'text',
      admin: { position: 'sidebar' },
    },
  ],
}
