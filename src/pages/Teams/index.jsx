import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Teams() {
  const translate = useLanguage();
  const entity = 'team';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: ['teamname', 'people.firstname', 'people.lastname'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Teams'),
    DATATABLE_TITLE: translate('team_list'),
    ADD_NEW_ENTITY: translate('add_team'),
    ENTITY_NAME: translate('Teams'),
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
