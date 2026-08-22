import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'total', 'createdAt'],
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
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'productId', type: 'text' },
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
