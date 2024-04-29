import { useLayoutEffect, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectListItems } from '@/redux/crud/selectors';
import { Row, Col, Tabs, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import ApprovalTable from '@/components/ApprovalTable';
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
      console.log(currentItem);
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

const ApprovalModule = ({ config, createForm, updateForm, withUpload = false }) => {
  let { entity } = config;

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  const currentAdmin = useSelector(selectCurrentAdmin);
  const selectedListItems = useSelector(selectListItems);
  const { result: listResult } = selectedListItems;
  const { pagination, items: dataSource } = listResult;

  const [currentStatus, setCurrentStatus] = useState('pending');
  const [totalCount, setTotalCount] = useState(0);
  const [productiveTime, setProductiveTime] = useState('0h 0m');
  const [unproductiveTime, setUnproductiveTime] = useState('0h 0m');
  const [neutralTime, setNeutralTime] = useState('0h 0m');

  const handelDataTableLoad = useCallback((pagination) => {
    const options = {
      page: pagination.current || 1, items: pagination.pageSize || 10, filter: 'status',
      equal: currentStatus, userId: currentAdmin
    };
    dispatch(crud.list({ entity, options }));
  }, []);


  const dispatcher = () => {
    const options = { filter: 'status', equal: currentStatus, userId: currentAdmin._id };
    dispatch(crud.list({ entity, options }));
  };

  // const updateddispatcher = () => {
  //   const options = { filter: 'status', equal: currentStatus, userId: currentAdmin._id };
  //   dispatch(crud.search({ entity, options }));
  // };

  const getFormatTime = (milliseconds) => {
    console.log(milliseconds)
    if (milliseconds || milliseconds === undefined || milliseconds === 0) {
      return '0h 0m';
    } else {
      const hours = Math.floor(milliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

      // Format hours and minutes
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      // Return formatted string
      return `${formattedHours}h ${formattedMinutes}m`;
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, [currentStatus]);

  const getTotalTimeFormat = (data) => {
    if (data) {
      let productiveTime = 0, unproductiveTime = 0, neutralTime = 0;
      let startTime, endTime, timeRange;
      data.map(item => {
        startTime = new Date(item.startTime);
        endTime = new Date(item.endTime);
        timeRange = endTime - startTime;
        if (item.productive === 'Productivity') {
          productiveTime += timeRange;
        } else if (item.productive === 'Unproductivity') {
          unproductiveTime += timeRange;
        } else if (item.productive === 'Neutral') {
          neutralTime += timeRange;
        }
      })

      setProductiveTime(getFormatTime(productiveTime));
      setUnproductiveTime(getFormatTime(unproductiveTime));
      setNeutralTime(getFormatTime(neutralTime));
    }
  }

  useEffect(() => {
    // setTotalCount(dataSource.length);
    // getTotalTimeFormat(dataSource);
    console.log(dataSource);
  }, [dataSource])

  const handleApprove = async (selectedRows) => {
    if (selectedRows.length > 0) {
      if (entity === 'weeklytime') {
        const jsonData = { selectedRows, type: 'approved' };
        dispatch(crud.create({ entity, jsonData }));
      } else {
        // console.log(selectedRows);
        const jsonData = { selectedRows, type: 'approved' };
        dispatch(crud.updateAll({ entity, jsonData }));
      }
      dispatcher();
    } else { }
  }

  const handleDeclien = async (selectedRows) => {
    if (selectedRows.length > 0) {
      if (entity === 'weeklytime') {
        const jsonData = { selectedRows, type: 'decliend' };
        dispatch(crud.create({ entity, jsonData }));
      } else {
        const jsonData = { selectedRows, type: 'decliend' };
        dispatch(crud.updateAll({ entity, jsonData }));
      }
      dispatcher();
    } else { }
  }

  const handleChangeTab = (value) => {
    // if (value != 'pending' && entity != 'manualtime') {
    //   updateddispatcher();
    // }
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
        <ApprovalTable config={config} handelDataTableLoad={handelDataTableLoad} selectedListItems={selectedListItems}
          approve={handleApprove} declien={handleDeclien} currentStatus={currentStatus} />
      </CrudLayout>
    </>
  );
}

export default ApprovalModule;
