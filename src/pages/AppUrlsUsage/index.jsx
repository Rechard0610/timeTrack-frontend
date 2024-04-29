import UsedProModule from '@/modules/UsedProModule';

import useLanguage from '@/locale/useLanguage';

export default function AppUrlsUsage() {
  const translate = useLanguage();
  const entity = 'survey';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('App & URL Usage List'),
    DATATABLE_TITLE: translate('projects_list'),
    ADD_NEW_ENTITY: translate('add_new_projects'),
    ENTITY_NAME: translate('Projects'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <UsedProModule
      config={config}
    />
  );
}
