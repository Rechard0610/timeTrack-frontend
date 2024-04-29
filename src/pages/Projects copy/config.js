export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  productCategory: {
    type: 'async',
    label: 'project Category',
    displayLabels: ['projectCategory', 'name'],
    dataIndex: ['projectCategory', 'name'],
    entity: 'projectcategory',
    required: true,
  },
  currency: {
    type: 'selectCurrency',
  },
  price: {
    type: 'currency',
    required: true,
  },
  description: {
    type: 'textarea',
  },
  ref: {
    type: 'string',
  },
};
