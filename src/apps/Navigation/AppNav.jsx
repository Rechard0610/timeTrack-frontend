import { Link } from 'react-router-dom';

import {
  DashboardOutlined,
  UserOutlined,
  ReconciliationOutlined,
  CarryOutOutlined,
  SnippetsOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const AppNav = ({ translate }) => [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to={'/'}>{translate('dashboard')}</Link>,
  },
  {
    key: 'timeline',
    icon: <BarChartOutlined />,
    label: <Link to={'/timeline'}>{translate('timeline')}</Link>,
  },
  {
    label: translate('approval'),
    key: 'approval',
    icon: <SafetyOutlined />,
    children: [
      {
        key: 'manualtime',
        label: <Link to={'/manualtime'}>{translate('manual time')}</Link>,
      },
      {
        key: 'weeklytime',
        label: <Link to={'/weeklytime'}>{translate('weekly time')}</Link>,
      },
      {
        key: 'payments',
        label: <Link to={'/payments'}>{translate('payments')}</Link>,
      },
      {
        key: 'income',
        label: <Link to={'/income'}>{translate('income')}</Link>,
      },
    ],
  },
  {
    label: translate('expenses'),
    key: 'expenses',
    icon: <DollarOutlined />,
    children: [
      {
        key: 'expenses',
        label: <Link to={'/expenses'}>{translate('expenses')}</Link>,
      },
      // {
      //   key: 'requests',
      //   label: <Link to={'/requests'}>{translate('requests')}</Link>,
      // },
      {
        key: 'lunchtime',
        label: <Link to={'/lunchtime'}>{translate('lunch')}</Link>,
      },
    ],
  },
  {
    key: 'clients',
    icon: <UserSwitchOutlined />,
    label: <Link to={'/clients'}>{translate('clients')}</Link>,
  },
  {
    key: 'remotetrack',
    icon: <ReconciliationOutlined />,
    label: <Link to={'/remotetrack'}>{translate('remotetrack')}</Link>,
  },
  {
    key: 'appurlusage',
    icon: <CarryOutOutlined />,
    label: <Link to={'/appurlusage'}>{translate('appurlusage')}</Link>,
  },
  {
    key: 'tasks',
    icon: <SnippetsOutlined />,
    label: <Link to={'/tasks'}>{translate('tasks')}</Link>,
  },
  {
    key: 'teams',
    icon: <TeamOutlined />,
    label: <Link to={'/teams'}>{translate('teams')}</Link>,
  },
  {
    key: 'members',
    icon: <UserOutlined />,
    label: <Link to={'/members'}>{translate('members')}</Link>,
  },
  {
    key: 'report',
    icon: <UserOutlined />,
    label: <Link to={'/report'}>{translate('report')}</Link>,
  },
  // {
  //   key: 'lead',
  //   icon: <FilterOutlined />,
  //   label: <Link to={'/lead'}>{translate('lead')}</Link>,
  // },
  // {
  //   key: 'offer',
  //   icon: <FileOutlined />,
  //   label: <Link to={'/offer'}>{translate('Offer Leads')}</Link>,
  // },
  // {
  //   key: 'invoice',
  //   icon: <ContainerOutlined />,
  //   label: <Link to={'/invoice'}>{translate('invoice')}</Link>,
  // },
  // {
  //   key: 'quote',
  //   icon: <FileSyncOutlined />,
  //   label: <Link to={'/quote'}>{translate('quote')}</Link>,
  // },
  // {
  //   key: 'payment',
  //   icon: <CreditCardOutlined />,
  //   label: <Link to={'/payment'}>{translate('payment')}</Link>,
  // },
  // {
  //   key: 'expenses',
  //   icon: <WalletOutlined />,
  //   label: <Link to={'/expenses'}>{translate('expense')}</Link>,
  // },
  // {
  //   key: 'projects',
  //   icon: <ProjectOutlined />,
  //   label: <Link to={'/projects'}>{translate('projects')}</Link>,
  // },
  // {
  //   key: 'categoryproduct',
  //   icon: <TagsOutlined />,
  //   label: <Link to={'/category/product'}>{translate('product_category')}</Link>,
  // },
  // // {
  // //   key: 'employee',
  // //   icon: <UserOutlined />,
  // //   label: <Link to={'/employee'}>{translate('employee')}</Link>,
  // // },

  // {
  //   label: translate('Settings'),
  //   key: 'settings',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       key: 'admin',
  //       // icon: <TeamOutlined />,
  //       label: <Link to={'/admin'}>{translate('Staff')}</Link>,
  //     },
  //     {
  //       key: 'generalSettings',
  //       label: <Link to={'/settings'}>{translate('general_settings')}</Link>,
  //     },
  //     {
  //       key: 'expensesCategory',
  //       label: <Link to={'/category/expenses'}>{translate('expenses_Category')}</Link>,
  //     },
  //     // {
  //     //   key: 'emailTemplates',
  //     //   label: <Link to={'/email'}>{translate('email_templates')}</Link>,
  //     // },
  //     {
  //       key: 'paymentMode',
  //       label: <Link to={'/payment/mode'}>{translate('payment_mode')}</Link>,
  //     },
  //     {
  //       key: 'taxes',
  //       label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
  //     },
  //     {
  //       key: 'about',
  //       label: <Link to={'/about'}>{translate('about')}</Link>,
  //     },
  //     // {
  //     //   key: 'advancedSettings',
  //     //   label: <Link to={'/settings/advanced'}>{translate('advanced_settings')}</Link>,
  //     // },
  //   ],
  // },
];

export default AppNav;
