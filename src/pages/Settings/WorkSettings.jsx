import useLanguage from '@/locale/useLanguage';
import WorkSettingModule from '@/modules/SettingModule/WorkSettingModule';

export default function WorkSettings() {
  const translate = useLanguage();

  const entity = 'recordsetting';

  const Labels = {
    PANEL_TITLE: translate('settings'),
    DATATABLE_TITLE: translate('settings_working days'),
    ADD_NEW_ENTITY: translate('add_new_working days'),
    ENTITY_NAME: translate('settings'),

    SETTINGS_TITLE: translate('Working days Settings'),
  };

  const configPage = {
    entity,
    settingsCategory: 'app_settings',
    ...Labels,
  };
  return <WorkSettingModule config={configPage} />;
}
