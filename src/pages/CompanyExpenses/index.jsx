import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import useLanguage from '@/locale/useLanguage';

export default function CompanyExpenses() {
  const translate = useLanguage();
  const entity = 'expense';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'comment',
  };
  const deleteModalLabels = ['name'];
  const currentAdmin = useSelector(selectCurrentAdmin);
  if(currentAdmin.role === 'owner') {
    fields.recipient.disableForForm = false;
  }
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

  console.log(fields);
  return (
    <>
      <CrudModule
        createForm={<DynamicForm fields={fields} />}
        updateForm={<DynamicForm fields={fields} />}
        config={config}
      />
    </>
  );
}
