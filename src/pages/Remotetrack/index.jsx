import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Remotetrack() {
  const translate = useLanguage();
  const entity = 'remotetrack';
  const searchConfig = {
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname,email',
  };
  const deleteModalLabels = ['firstname', 'lastname'];

  const Labels = {
    PANEL_TITLE: translate('remotetrack'),
    DATATABLE_TITLE: translate('remotetrack_list'),
    ADD_NEW_ENTITY: translate('add_new_remotetrack'),
    ENTITY_NAME: translate('remotetrack'),
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
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
