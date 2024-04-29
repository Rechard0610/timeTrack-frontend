import PaymentModule from '@/modules/ApprovalModule/PaymentModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import { lunchFields } from '../LunchTime/config'

import useLanguage from '@/locale/useLanguage';

export default function AdminCompanyExpenses() {
  const translate = useLanguage();
  const entity = 'payment';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'comment',
  };
  const deleteModalLabels = ['name'];
  const Labels = {
    PANEL_TITLE: translate('Expenses'),
    DATATABLE_TITLE: translate('expenses_list'),
    ADD_NEW_ENTITY: translate('add_new_expense'),
    ENTITY_NAME: translate('expenses'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };

  const lunchEntity = 'lunch';

  const lunchConfig = {
    lunchEntity,
    lunchFields,
  };

  return (
    <>
      <PaymentModule
        createForm={<DynamicForm fields={fields} />}
        updateForm={<DynamicForm fields={fields} />}
        config={config}
        lunchConfig={lunchConfig}
      />
    </>
  );
}
