export const fields = {
    "userId": {
        label: "Created By",
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
    "recipient": {
        label: "Recipient",
        type: 'avatar',
        required: true,
        entity: 'admin',
        redirectLabel: 'Add New People',
        withRedirect: true,
        urlToRedirect: '/members',
        displayLabels: [
            'firstname', 'lastname'
        ],
        searchFields: 'firstname,lastname',
        dataIndex: [
            'people', 'firstname'
        ],
        feedback: 'people'
    },
    "created": {
        label: 'Date',
        type: 'date',
        disableForForm: true
    },
    'expenseCategory': {
        label: 'Expense Category',
        type: 'async',
        displayLabels: [
            'expenseCategory', 'name'
        ],
        dataIndex: [
            'expenseCategory', 'name'
        ],
        entity: 'expensecategory',
        required: true,
        redirectLabel: 'Add New Category',
        withRedirect: true,
        urlToRedirect: '/categoryexpenses',
    },
    "comment": {
        label: 'Comment',
        type: 'string',
        required: true
    },
    "amount": {
        label: 'Amount',
        type: 'amount'
    },
    "status": {
        label: 'Status',
        default: 'pending',
        disableForForm: true
    },
    "type": {
        label: 'Type',
        type: 'select',
        required: true,
        defaultValue: 'Request',
        options: [
          { value: 'Request', label: 'Request'},
          { value: 'Company Expenses', label: 'Company Expenses'},
        ],
      },
};
