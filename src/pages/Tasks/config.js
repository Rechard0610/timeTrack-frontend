export const fields = {
  "name": {
    label: "task name",
    type: 'string',
    required: true,
  },
  "project": {
    required: true,
  },
  "description": {
    required: true,
    disableForForm: true,
  },
  "people": {
    label: 'assigne people',
    type: 'selectWithFeedback',
    required: true,
  },
  "budget": {
    label: 'budget',
    type: 'taskbudget',
    default: 0,
  },
  "created": {
    type: 'date',
    disableForForm: true,
  },
  "status": {
    type: 'select',
    required: true,
    defaultValue: 'In Quatation',
    options: [
      { value: 'In Quatation', label: 'In Quatation'},
      { value: 'In Progress', label: 'In Progress'},
      { value: 'Finished', label: 'Finished'},
      { value: 'Stalled', label: 'Stalled'},
    ],
  },
  "project": {
    type: 'asyncbudget',
    label: 'project number',
    entity: 'project',
    required: true,
    redirectLabel: 'Add New Project',
    withRedirect: true,
    urlToRedirect: '/project',
    displayLabels: ['projectnumber', 'lastname'],
    searchFields: 'projectnumber,lastname',
    dataIndex: ['project', 'projectnumber'],
    // disableForTable: true,
    hasFeedback: true,
    feedback: 'project',
  },

  "people": {
    type: 'avatargroup',
    label: 'assign people',
    entity: ['admin', 'team'],
    required: true,
    redirectLabel: 'Add New People',
    withRedirect: true,
    urlToRedirect: '/invitepeople',
    displayLabels: ['firstname', 'lastname', 'teamname'],
    searchFields: 'firstname,lastname,teamname',
    dataIndex: ['people', 'firstname'],
  },

  "description": {
    type: 'string',
    label: 'description',
    entity: 'project',
    required: false,
    displayLabels: ['description', 'lastname'],
    dataIndex: ['project', 'description'],
    disableForForm: true,
  },
};
