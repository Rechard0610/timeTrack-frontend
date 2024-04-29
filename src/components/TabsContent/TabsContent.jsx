import { Tabs, Row, Col } from 'antd';

const SettingsLayout = ({ children }) => {
  return (
    <Col className="gutter-row">
      <div style={{ minHeight: '500px' }}>
        {children}
      </div>
    </Col>
  );
};

const TopCard = ({ pageTitle }) => {
  return (
    <div
      className="whiteBox shadow"
      style={{
        color: '#595959',
        fontSize: 13,
        height: '0px',
        minHeight: 'auto',
        marginBottom: '30px',
      }}
    >
      <div className="pad20 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#22075e', marginBottom: 0, marginTop: 0 }}>{pageTitle}</h2>
      </div>
    </div>
  );
};

const RightMenu = ({ children, pageTitle }) => {
  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 7 }}
      lg={{ span: 4 }}
      order={1}
    >
      <TopCard pageTitle={pageTitle} />
      <div className="whiteBox shadow">
        <div className="pad25" style={{ width: '100%', paddingBottom: 0 }}>
          {children}
        </div>
      </div>
    </Col>
  );
};

export default function TabsContent({ content, defaultActiveKey, pageTitle }) {
  const items = content.map((item, index) => {
    return {
      key: item.key ? item.key : index + '_' + item.label.replace(/ /g, '_'),
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {item.icon} <span>{item.label}</span>
        </div>
      ),
      children: <SettingsLayout>{item.children}</SettingsLayout>,
    };
  });

  const renderTabBar = (props, DefaultTabBar) => (
    <RightMenu pageTitle={pageTitle}>
      <DefaultTabBar {...props} />
    </RightMenu>
  );
// 
  return (
    <Row gutter={[24, 24]} className="tabContent">
      <Tabs
        tabPosition="right"
        defaultActiveKey={defaultActiveKey}
        hideAdd={true}
        items={items}
        style={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
    </Row>
  );
}
