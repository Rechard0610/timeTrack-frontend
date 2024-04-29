export const fields = {
  "Member": {
    type: 'avatar',
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
    type: 'taskname',
    required: true,
  },
  "totalTimeRange": {
    label: 'working time', 
    type: 'timeformat',
  },
  "percentage": {
    label: "percentage",
    type: 'editable',
  },
  "billabletime": {
    label: "billable time",
    type: 'editable',
  },
  "totalBillableTime": {
    label: "billable time",
    type: 'timeformat',
  },
  "totalSpent": {
    label: "total spent",
    type: 'timeformat',
  },
  "totalBudget": {
    label: "total budget",
    type: 'timeformatwithhour',
  },
  "totalBillableTime": {
    label: "total billable time",
    type: 'timeformat',
  },
  "averageActivity": {
    label: "activity",
    type: 'percentage',
  },
  "productivity": {
    label: "productivity",
    type: 'percentage',
  },
  "created": {
    label: "created on",
    type: 'date',
    required: true,
    disableForTable: true,
  },
};
