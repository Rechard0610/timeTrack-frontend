import {
  SettingOutlined,
  TrophyOutlined,
  FileImageOutlined,
  ProjectOutlined,
  DollarOutlined,
  PlusSquareOutlined,
  WindowsOutlined,
} from '@ant-design/icons';

import TabsContent from '@/components/TabsContent/TabsContent';

import CompanyLogoSettings from './CompanyLogoSettings';
import ProjectSettings from './ProjectSettings';
import RecordSettings from './RecordSettings';
import WorkSettings from './WorkSettings';
import CompanySettings from './CompanySettings';
import MemberSettings from '@/pages/Settings/MemberSettings';

import GeneralSettings from './GeneralSettings';
import FinanceSettings from './FinanceSettings';
import MoneyFormatSettings from './MoneyFormatSettings';
import Currentcy from '@/pages/Currency';
import AddSubTask from '@/pages/SubTask';
import AppTypeSettings from './AppTypeSettings';

import useLanguage from '@/locale/useLanguage';
import { useParams } from 'react-router-dom';

export default function Settings() {
  const translate = useLanguage();
  const { settingsKey } = useParams();
  const content = [
    // {
    //   key: 'apptype_settings',
    //   label: translate('apptype settings'),
    //   icon: <ProductOutlined />,
    //   children: <AppTypeSettings />,
    // },
    // {
    //   key: 'add_subtask',
    //   label: translate('add subtask'),
    //   icon: <PlusSquareOutlined />,
    //   children: <AddSubTask />,
    // },
    // {
    //   key: 'general_settings',
    //   label: translate('General Settings'),
    //   icon: <SettingOutlined />,
    //   children: <GeneralSettings />,
    // },
    {
      key: 'member_settings',
      label: translate('Member Settings'),
      icon: <TrophyOutlined />,
      children: <MemberSettings />,
    },
    {
      key: 'company_settings',
      label: translate('Company Settings'),
      icon: <TrophyOutlined />,
      children: <CompanySettings />,
    },
    {
      key: 'work_settings',
      label: translate('Work Settings'),
      icon: <SettingOutlined />,
      children: <WorkSettings />,
    },
    {
      key: 'company_logo',
      label: translate('Company Logo'),
      icon: <FileImageOutlined />,
      children: <CompanyLogoSettings />,
    },
    {
      key: 'project_settings',
      label: translate('Project Settings'),
      icon: <ProjectOutlined />,
      children: <ProjectSettings />,
    },
    {
      key: 'record_settings',
      label: translate('Record Settings'),
      icon: <WindowsOutlined />,
      children: <RecordSettings />,
    },
    // {
    //   key: 'currency_settings',
    //   label: translate('Currency Settings'),
    //   icon: <DollarOutlined />,
    //   children: <Currentcy />,
    // },
    // {
    //   key: 'finance_settings',
    //   label: translate('Finance Settings'),
    //   icon: <CreditCardOutlined />,
    //   children: <FinanceSettings />,
    // },
  ];

  const pageTitle = translate('Settings');

  return <TabsContent defaultActiveKey={settingsKey} content={content} pageTitle={pageTitle}/>;
}
