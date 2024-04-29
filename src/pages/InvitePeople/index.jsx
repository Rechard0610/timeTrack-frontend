import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function InvitePeople() {
  const translate = useLanguage();
  const entity = 'people';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'email',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('invitepeople'),
    DATATABLE_TITLE: translate('invite_people_list'),
    ADD_NEW_ENTITY: translate('add_new_person'),
    ENTITY_NAME: translate('invitepeople'),
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
