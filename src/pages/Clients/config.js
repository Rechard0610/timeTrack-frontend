export const fields = {
  "name": {
    label: 'client name',
    type: 'string',
    required: true,
  },
  "hourlyrate": {
    label: 'client hourly rate',
    type: 'number',
    required: true,
  },
  "currency": {
    label: "currency",
    type: 'select',
    defaultValue: 'USA',
    required: true,
    options: [
      { value: 'USD', label: 'USD'},
      { value: 'CAD', label: 'CAD'},
      { value: 'EUR', label: 'EUR'},
    ],
  },
  "contactnr": {
    label: 'contact nr',
    type: 'string',
  },
  "contactphone": {
    label: 'contact phone',
    type: 'phone',
  },
  "contactgmail": {
    label: 'contact email',
    type: 'email',
  },
  "companyaddress": {
    label: 'company address',
    type: 'address',
  },
  "vatid": {
    label: 'vat id',
    type: 'string',
  },
  "regnr": {
    label: 'reg nr',
    type: 'string',
  },
  "defaulttask": {
    label: 'default tasks',
    type: 'defaulttask',
  },
  "created": {
    label: "created on",
    type: 'date',
    required: true,
    disableForForm: true,
  },
};
