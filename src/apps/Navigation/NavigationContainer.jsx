import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.png';
// import logoText from '@/style/images/logo-text.svg';

import useResponsive from '@/hooks/useResponsive';

import {
  DashboardOutlined,
  UserOutlined,
  MenuOutlined,
  ReconciliationOutlined,
  CarryOutOutlined,
  SnippetsOutlined,
  ProjectOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  BarChartOutlined,
  SafetyOutlined,
  WalletOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
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
      icon: <WalletOutlined />,
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
      key: 'timesheets',
      icon: <ReconciliationOutlined />,
      label: <Link to={'/timesheets'}>{translate('timesheets')}</Link>,
    },
    {
      key: 'appurlusage',
      icon: <CarryOutOutlined />,
      label: <Link to={'/appurlusage'}>{translate('apps & urls usage')}</Link>,
    },
    {
      key: 'tasks',
      icon: <SnippetsOutlined />,
      label: <Link to={'/tasks'}>{translate('tasks')}</Link>,
    },
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: <Link to={'/projects'}>{translate('projects')}</Link>,
    },
    {
      key: 'clients',
      icon: <UserSwitchOutlined />,
      label: <Link to={'/clients'}>{translate('clients')}</Link>,
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
    //   key: 'company',
    //   icon: <ShopOutlined />,
    //   label: <Link to={'/company'}>{translate('companies')}</Link>,
    // },
    // {
    //   key: 'lead',
    //   icon: <FilterOutlined />,
    //   label: <Link to={'/lead'}>{translate('leads')}</Link>,
    // },
    // {
    //   key: 'offer',
    //   icon: <FileOutlined />,
    //   label: <Link to={'/offer'}>{translate('offers')}</Link>,
    // },
    // {
    //   key: 'invoice',
    //   icon: <ContainerOutlined />,
    //   label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
    // },
    // {
    //   key: 'quote',
    //   icon: <FileSyncOutlined />,
    //   label: <Link to={'/quote'}>{translate('proforma invoices')}</Link>,
    // },
    // {
    //   key: 'payment',
    //   icon: <CreditCardOutlined />,
    //   label: <Link to={'/payment'}>{translate('payments')}</Link>,
    // },
    // {
    //   key: 'projects',
    //   icon: <TagOutlined />,
    //   label: <Link to={'/projects'}>{translate('projects')}</Link>,
    // },
    // {
    //   key: 'categoryproduct',
    //   icon: <TagsOutlined />,
    //   label: <Link to={'/category/product'}>{translate('products_category')}</Link>,
    // },
    // {
    //   key: 'expenses',
    //   icon: <WalletOutlined />,
    //   label: <Link to={'/expenses'}>{translate('expenses')}</Link>,
    // },
    // {
    //   key: 'expensesCategory',
    //   icon: <ReconciliationOutlined />,
    //   label: <Link to={'/category/expenses'}>{translate('expenses_Category')}</Link>,
    // },
    // {
    //   key: 'employee',
    //   icon: <UserOutlined />,
    //   label: <Link to={'/employee'}>{translate('employee')}</Link>,
    // },

    // {
    //   label: translate('Settings'),
    //   key: 'settings',
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       key: 'admin',
    //       // icon: <TeamOutlined />,
    //       label: <Link to={'/admin'}>{translate('admin')}</Link>,
    //     },
    //     {
    //       key: 'generalSettings',
    //       label: <Link to={'/settings'}>{translate('settings')}</Link>,
    //     },
    //     {
    //       key: 'currency',
    //       label: <Link to={'/settings/currency'}>{translate('currencies')}</Link>,
    //     },

    //     // {
    //     //   key: 'emailTemplates',
    //     //   label: <Link to={'/email'}>{translate('email_templates')}</Link>,
    //     // },
    //     {
    //       key: 'paymentMode',
    //       label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
    //     },
    //     {
    //       key: 'taxes',
    //       label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
    //     },
    //     {
    //       key: 'about',
    //       label: <Link to={'/about'}>{translate('about')}</Link>,
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        bottom: '20px',
        ...(!isMobile && {
          background: 'none',
          border: 'none',
          left: '20px',
          top: '20px',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
        }}
      >
        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '80px' }} />

        {/* {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '38px',
            }}
          />
        )} */}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
          width: 250,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn bg-teal-300"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
