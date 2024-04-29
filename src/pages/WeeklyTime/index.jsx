import ApprovalModule from '@/modules/ApprovalModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function WeeklyTime() {
  const translate = useLanguage();
  const entity = 'weeklytime';
  const searchConfig = {
    displayLabels: ['Weekly Time'],
    searchFields: ['firstname', 'lastname', 'initials'],
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Weekly Time'),
    DATATABLE_TITLE: translate('weekly_list'),
    ENTITY_NAME: translate('Weekly'),
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
