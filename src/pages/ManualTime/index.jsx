import ApprovalModule from '@/modules/ApprovalModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function ManualTime() {
  const translate = useLanguage();
  const entity = 'manualtime';
  const searchConfig = {
    displayLabels: ['Manual Time'],
    searchFields: ['firstname', 'lastname', 'initials'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Manual Time'),
    DATATABLE_TITLE: translate('manual_list'),
    ENTITY_NAME: translate('Manual'),
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
    <ApprovalModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
