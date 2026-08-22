import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Inställningar',
  fields: [
    {
      name: 'store',
      type: 'group',
      label: 'Butik',
      fields: [
        { name: 'storeName', type: 'text', defaultValue: 'Sleepie' },
        { name: 'email', type: 'email', defaultValue: 'hej@sleepie.se' },
        { name: 'phone', type: 'text' },
        { name: 'currency', type: 'text', defaultValue: 'SEK' },
      ],
    },
    {
      name: 'mollie',
      type: 'group',
      label: 'Mollie',
      fields: [
        {
          name: 'apiKeyLive',
          type: 'text',
          admin: { description: 'Live API key (börjar med live_)' },
        },
        {
          name: 'apiKeyTest',
          type: 'text',
          admin: { description: 'Test API key (börjar med test_)' },
        },
        {
          name: 'webhookSecret',
          type: 'text',
        },
      ],
    },
    {
      name: 'cj',
      type: 'group',
      label: 'CJDropshipping',
      fields: [
        { name: 'apiKey', type: 'text' },
        { name: 'apiSecret', type: 'text' },
        { name: 'accessToken', type: 'text' },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Frakt',
      fields: [
        {
          name: 'defaultMethod',
      type: 'text',
          defaultValue: 'Standard',
        },
        {
          name: 'freeShippingThreshold',
          type: 'number',
          defaultValue: 799,
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Feature flags',
      fields: [
        {
          name: 'showBundles',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'maintenanceMode',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
