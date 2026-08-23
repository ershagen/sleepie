import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'active', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sku',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text' }],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Rocker', value: 'Rocker' },
        { label: 'Ljud', value: 'Ljud' },
        { label: 'Textil', value: 'Textil' },
        { label: 'Bundle', value: 'Bundle' },
      ],
    },
    {
      name: 'badge',
      type: 'text',
      admin: { description: 't.ex. Bästsäljare, Kit' },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Extern bild-URL (t.ex. Vercel Blob) om media inte används',
      },
    },
    {
      name: 'galleryUrls',
      type: 'array',
      labels: { singular: 'URL', plural: 'Gallery URLs' },
      fields: [{ name: 'url', type: 'text' }],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'cj',
      type: 'group',
      label: 'CJDropshipping',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'pid', type: 'text', label: 'Product ID (pid)' },
        {
          name: 'vid',
          type: 'text',
          label: 'Variant ID (vid)',
          admin: { description: 'Krävs för createOrder' },
        },
        { name: 'sku', type: 'text', label: 'SKU' },
        { name: 'costUsd', type: 'number', label: 'Kostnad USD' },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
