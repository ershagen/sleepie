import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'cjVid', 'updatedAt'],
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
      admin: {
        position: 'sidebar',
      },
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
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
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
      admin: {
        description: 't.ex. Bästsäljare, Kit',
      },
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
        {
          name: 'pid',
          type: 'text',
          label: 'Product ID (pid)',
        },
        {
          name: 'vid',
          type: 'text',
          label: 'Variant ID (vid)',
          admin: {
            description: 'Krävs för createOrder',
          },
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
        },
        {
          name: 'costUsd',
          type: 'number',
          label: 'Kostnad USD',
        },
      ],
    },
    {
      name: 'cjProductId',
      type: 'text',
      admin: {
        description: 'Legacy: använd cj.vid istället',
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
