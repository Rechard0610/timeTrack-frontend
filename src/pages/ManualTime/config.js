export const fields = {
  "userId": {
    label: "Member",
    type: 'avatar',
    required: true,
    disableForForm: true,
    entity: 'admin',
    displayLabels: [
        'firstname', 'lastname'
    ],
    dataIndex: [
        'people', 'firstname'
    ],
    searchFields: 'firstname,lastname',
    feedback: 'people',
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
  "task": {
    label: "task",
    type: 'totalweek', // to display the task in Manual table
  },
  "date": {
    type: 'manualdate',
  },
  "time": {
    label: "time range",
    type: 'timerange',
    required: true,
    disableForForm: true,
  },
  "total time": {
    label: "total time",
    type: 'totaltime',
    required: true,
    disableForForm: true,
  },
  "reason": {
    label: "reason",
    type: 'string',
    required: true,
  },
  "created": {
    label: "created on",
    type: 'date',
    required: true,
    disableForTable: true,
  },
};
