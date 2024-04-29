import useLanguage from '@/locale/useLanguage';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import AppTypeSettingsModule from '@/modules/SettingModule/AppTypeSettingsModule';

export default function AppTypeSettings() {
  const translate = useLanguage();
  const entity = 'apptype';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: ['teamname', 'people.firstname', 'people.lastname'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('apptype'),
    DATATABLE_TITLE: translate('apptype_list'),
    ADD_NEW_ENTITY: translate('add_new_app'),
    ENTITY_NAME: translate('apptype'),
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
  return (<AppTypeSettingsModule
    createForm={<DynamicForm fields={fields} />}
    updateForm={<DynamicForm fields={fields} />}
    config={config} />);
}
