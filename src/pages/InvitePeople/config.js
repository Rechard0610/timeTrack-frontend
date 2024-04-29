export const fields = {
  "email": {
    label: "invite e-mail",
    type: 'email',
    required: true,
  },
  "role": {
    label: 'user group',
    type: 'select',
    required: true,
    defaultValue: 'user',
    options: [
      { value: 'admin', label: 'Admin'},
      { value: 'projectmanager', label: 'Project Manager'},
      { value: 'user', label: 'User'},
      { value: 'guest', label: 'Guest'},
    ],
  },
  
  "created": {
    label: "created on",
    type: 'date',
    required: true,
    disableForForm: true,
  },
  
  "status": {
    type: 'boolean',
    disableForForm: true,
  },
  
  // people: {
  //   type: 'search',
  //   label: 'people',
  //   entity: 'people',
  //   redirectLabel: 'Add New Person',
  //   withRedirect: true,
  //   urlToRedirect: '/people',
  //   displayLabels: ['firstname', 'lastname'],
  //   searchFields: 'firstname,lastname',
  //   dataIndex: ['people', 'firstname'],
  //   disableForTable: true,
  //   feedback: 'people',
  // },
  // company: {
  //   type: 'search',
  //   label: 'company',
  //   entity: 'company',
  //   redirectLabel: 'Add New Company',
  //   withRedirect: true,
  //   urlToRedirect: '/company',
  //   displayLabels: ['name'],
  //   searchFields: 'name',
  //   dataIndex: ['company', 'name'],
  //   disableForTable: true,
  //   feedback: 'company',
  // },
};
