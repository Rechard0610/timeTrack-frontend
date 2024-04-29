import useLanguage from '@/locale/useLanguage';

import ProjectSettingModule from '@/modules/SettingModule/ProjectSettingModule';

export default function ProjectSettings() {
  const translate = useLanguage();

  const entity = 'projectsetting';

  const Labels = {
    PANEL_TITLE: translate('settings'),
    DATATABLE_TITLE: translate('settings_list'),
    ADD_NEW_ENTITY: translate('add_new_settings'),
    ENTITY_NAME: translate('settings'),

    SETTINGS_TITLE: translate('Project Settings'),
  };

  const configPage = {
    entity,
    settingsCategory: 'app_settings',
    ...Labels,
  };
  return <ProjectSettingModule config={configPage} />;
}
