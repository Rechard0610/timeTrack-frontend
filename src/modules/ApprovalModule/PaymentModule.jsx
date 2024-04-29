import { useLayoutEffect, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectListItems } from '@/redux/crud/selectors';
import { Row, Col, Tabs, Button, Divider, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import PaymentTable from '@/components/ApprovalTable/PaymentTable';
import EditableTable from '@/components/EditableTable/EditableTable';

import InfoCard from './components/infocard';
import CreateForm from '@/components/CreateForm';
import UpdateForm from '@/components/UpdateForm';
import ReadItem from '@/components/ReadItem';
import SearchItem from '@/components/SearchItem';

import { crud } from '@/redux/crud/actions';
import { CrudLayout } from '@/layout';
import { selectCurrentItem } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { useCrudContext } from '@/context/crud';
import { PanelGroup } from 'rsuite';

const tabItems = [
  {
    key: 'pending',
    label: 'PENDING',
  },
  {
    key: 'approved',
    label: 'APPROVED',
  },
  {
    key: 'decliend',
    label: 'DECLINED',
  },
];

function SidePanelTopContent({ config, formElements, withUpload }) {
  const translate = useLanguage();
  const { crudContextAction, state } = useCrudContext();
  const { deleteModalLabels } = config;
  const { modal, editBox, collapsedBox, panel } = crudContextAction;

  const { isReadBoxOpen, isEditBoxOpen } = state;
  const { result: currentItem } = useSelector(selectCurrentItem);
  const dispatch = useDispatch();

  const [labels, setLabels] = useState('');
  useEffect(() => {
    if (currentItem) {
      const currentlabels = deleteModalLabels.map((x) => currentItem[x]).join(' ');
      setLabels(currentlabels);
    }
  }, [currentItem]);

  const removeItem = () => {
    dispatch(crud.currentAction({ actionType: 'delete', data: currentItem }));
    modal.open();
  };
  const editItem = () => {
    dispatch(crud.currentAction({ actionType: 'update', data: currentItem }));
    editBox.open();
  };

  const show = isReadBoxOpen || isEditBoxOpen ? { opacity: 1 } : { opacity: 0 };
  return (
    <>
      <Row style={show} gutter={(24, 24)}>
        <Col span={10}>
          <p style={{ marginBottom: '10px' }}>{labels}</p>
        </Col>
        <Col span={14}>
          <Button
            onClick={editItem}
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '0px', marginTop: '10px' }}
          >
            {translate('edit')}
          </Button>
        </Col>

        <Col span={24}>
          <div className="line"></div>
        </Col>
        <div className="space10"></div>
      </Row>
      <ReadItem config={config} />
      <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
    </>
  );
}

const PaymentModule = ({ config, createForm, updateForm, lunchConfig, withUpload = false }) => {
  let { entity } = config;

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  const currentAdmin = useSelector(selectCurrentAdmin);
  const selectedListItems = useSelector(selectListItems);
  const { result: listResult } = selectedListItems;
  const { pagination, items: dataSource } = listResult;
  console.log(selectedListItems)

  const [currentStatus, setCurrentStatus] = useState('pending');
  const [totalCount, setTotalCount] = useState(0);
  const [productiveTime, setProductiveTime] = useState('0h 0m');
  const [unproductiveTime, setUnproductiveTime] = useState('0h 0m');
  const [neutralTime, setNeutralTime] = useState('0h 0m');
  const [tableData, setTableData] = useState([1, 2]);

  const handelDataTableLoad = (pagination) => {
    const options = {
      page: pagination.current || 1, items: pagination.pageSize || 10, filter: 'status',
      equal: currentStatus, userId: currentAdmin
    };
    dispatch(crud.list({ entity, options }));
  };


  const dispatcher = () => {
    const options = { filter: 'status', equal: currentStatus, userId: currentAdmin._id };
    dispatch(crud.list({ entity, options }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, [currentStatus]);

  const handleApprove = async (selectedRows) => {
    if (selectedRows.length > 0) {
      const jsonData = { selectedRows, type: 'approved' };
      dispatch(crud.updateAll({ entity, jsonData }));
      dispatcher();
    } else { dispatcher(); }
  }

  const handleDeclien = async (selectedRows) => {
    if (selectedRows.length > 0) {
      const jsonData = { selectedRows, type: 'decliend' };
      dispatch(crud.updateAll({ entity, jsonData }));
      dispatcher();
    } else { }
  }

  const getTableData = (data) => {
    console.log(data);
    setTableData(data);
  }

  const handleChangeTab = (value) => {
    setCurrentStatus(value);
  }

  return (
    <>
      <Tabs defaultActiveKey="pending" items={tabItems} onChange={handleChangeTab} />
      <Row gutter={16} style={{ marginBottom: '16px', marginTop: '32px' }}>
        <Col span={6}>
          <InfoCard label={'TOTAL COUNTS'} value={totalCount} />
        </Col>
        <Col span={6}>
          <InfoCard label={'PRODUCTIVE TIME'} value={productiveTime} />
        </Col>
        <Col span={6}>
          <InfoCard label={'UNPRODUCTIVE TIME'} value={unproductiveTime} />
        </Col>
        <Col span={6}>
          <InfoCard label={'NEUTRAL TIME'} value={neutralTime} />
        </Col>
      </Row>
      <CrudLayout
        config={config}
        sidePanelBottomContent={
          <CreateForm config={config} formElements={createForm} withUpload={withUpload} />
        }
        sidePanelTopContent={
          <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} />
        }
      >
        <PaymentTable config={config} handelDataTableLoad={handelDataTableLoad} selectedListItems={selectedListItems}
          approve={handleApprove} declien={handleDeclien} currentStatus={currentStatus} />
      </CrudLayout>
      {
        tableData.length > 0 && currentStatus === 'pending' &&
        <>
          <Divider className='my-3' />
          <Card>
            <EditableTable config={lunchConfig} getTableData={getTableData} />
          </Card>
        </>
      }
    </>
  );
}

export default PaymentModule;
