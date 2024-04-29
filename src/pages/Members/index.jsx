import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Members() {
  const translate = useLanguage();
  const entity = 'admin';
  const searchConfig = {
    displayLabels: ['teamname'],
    searchFields: ['firstname', 'lastname', 'initials'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Members'),
    DATATABLE_TITLE: translate('member_list'),
    ADD_NEW_ENTITY: translate('add_new_member'),
    ENTITY_NAME: translate('Members'),
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
