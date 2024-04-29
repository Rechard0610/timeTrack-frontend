import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import SettingsForm from './SettingsForm';
import useLanguage from '@/locale/useLanguage';

export default function RecordSettingModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('Record Settings')}
        description={translate('Update App Record Settings')}
      >
        <SettingsForm />
      </SetingsSection>
    </UpdateSettingModule>
  );
}
