import useLanguage from '@/locale/useLanguage';

import RecordSettingModule from '@/modules/SettingModule/RecordSettingModule';

export default function RecordSettings() {
  const translate = useLanguage();

  const entity = 'recordsetting';

  const Labels = {
    PANEL_TITLE: translate('settings'),
    DATATABLE_TITLE: translate('settings_list'),
    ADD_NEW_ENTITY: translate('add_new_settings'),
    ENTITY_NAME: translate('settings'),

    SETTINGS_TITLE: translate('Record Settings'),
  };

  const configPage = {
    entity,
    settingsCategory: 'app_settings',
    ...Labels,
  };
  return <RecordSettingModule config={configPage} />;
}
