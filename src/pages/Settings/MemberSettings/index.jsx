import MemberSetting from '@/modules/CrudModule/MemberSetting';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function MemberSettings() {
  const translate = useLanguage();
  const entity = 'membersetting';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,phone,eamil',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('membersetting'),
    DATATABLE_TITLE: translate('membersetting_list'),
    ADD_NEW_ENTITY: translate('add_new_membersetting'),
    ENTITY_NAME: translate('membersetting'),
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
    <MemberSetting
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
