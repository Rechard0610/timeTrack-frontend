export const fields = {
  "avatar": {
    label: "picture",
    type: 'member',
    required: true,
    disableForForm: true,
  },
  "firstname": {
    label: 'name',
    type: 'string',
    required: true,
    disableForForm: true,
  },
  "lastname": {
    label: "surname",
    type: 'string',
    required: true,
    disableForForm: true,
  },
  "initials": {
    type: 'string',
  },
  "email": {
    label: "email",
    type: 'email',
    required: true,
    disableForForm: true,
  },
  "teams": {
    label: "teams",
    type: 'teams',
    required: true,
    disableForForm: true,
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
};
