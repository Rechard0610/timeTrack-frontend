import color from '@/utils/color';

export const fields = {
  "clientname": {
    label: 'client name',
    required: true,
  },
  "projectnumber": {
    label: 'project number',
    type: 'projectnumber',
    entity: 'project',
    required: true,
  },
  "clientproject": {
    label: 'client project',
    type: 'string',
    required: true,
  },
  "budget": {
    type: 'budget',
  },
  "description": {
    type: 'textarea',
    required: true,
  },
  "people": {
    label: 'assigne people',
    type: 'selectWithFeedback',
    required: true,
  },
  "subtask": {
    label: "add sub tasks",
    type: 'selectDefaultTask',
    disableForTable: true,
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
  'statusnote': {
    label: 'status note',
    type: 'textarea'
  },
  "clientname": {
    type: 'clientname',
    label: 'client name',
    entity: 'client',
    required: true,
    redirectLabel: 'Add New Client',
    withRedirect: true,
    urlToRedirect: '/clients',
    displayLabels: ['name'],
    searchFields: 'name,lastname',
    dataIndex: ['client', 'name'],
    hasFeedback: true,
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
    hasFeedback: true,
    feedback: 'people',
  },
};
