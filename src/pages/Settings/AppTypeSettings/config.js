export const fields = {
  "appname": {
    label: "app name",
    type: 'string',
    required: true,
  },
  "type": {
    label: "type",
    type: 'select',
    options: [
      { value: 'Productivity', label: 'Productivity', color: 'yello'},
      { value: 'Unproductivity', label: 'Unproductivity', color: 'blue'},
      { value: 'Neutral', label: 'Neutral', color: 'pink'},
    ],
  },
};
