import ClientModule from '@/modules/ClientModule/ClientModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Clients() {
  const translate = useLanguage();
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: ['name', 'contactphone', 'contactgmail', 'companyaddress', 'vatid', 'regnr', 'contactnr', 'currency'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('client'),
    DATATABLE_TITLE: translate('client_list'),
    ADD_NEW_ENTITY: translate('add_new_client'),
    ENTITY_NAME: translate('client'),
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
  return (
    <ClientModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
