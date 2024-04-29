import SetingsSection from '../components/SetingsSection';
import UpdateSettingModule from '../components/UpdateSettingModule';
import SettingsForm from './SettingsForm';
import useLanguage from '@/locale/useLanguage';

export default function ProjectSettingModule({ config }) {
  const translate = useLanguage();
  return (
    <UpdateSettingModule config={config}>
      <SetingsSection
        title={translate('Project Settings')}
        description={translate('Update Company Project Settings')}
      >
        <SettingsForm />
      </SetingsSection>
    </UpdateSettingModule>
  );
}
