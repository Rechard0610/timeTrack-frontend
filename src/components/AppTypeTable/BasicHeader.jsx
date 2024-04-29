import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  RedoOutlined,
} from '@ant-design/icons';
import { Button, Select } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { crud } from '@/redux/crud/actions';
import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';

function AddNewItem({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY } = config;

  const handelClick = () => {
    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handelClick} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
      {ADD_NEW_ENTITY}
    </Button>
  );
}
export default function SideContent( {config} ) {
  let { entity, DATATABLE_TITLE, searchConfig } = config;
  const translate = useLanguage();

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(crud.list({ entity, options }));
  }, []);

  const filterTable = (e) => {
    const value = e.target.value;
    const options = { q: value, fields: searchConfig?.searchFields || '' };
    dispatch(crud.list({ entity, options }));
  };

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <PageHeader
        title=''
        extra={[
          <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1} >
            <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto minmax(auto, 640px)" }}>
              <div className='grid gap-y-1.5'>
                <p>Type</p>
                <Select
                  variant="outlined"
                  className='min-w-48	outline-blue-500 min-h-10'
                  placeholder="Type"
                  options={[
                    { value: 'productive', label: 'Productive', color: 'yello' },
                    { value: 'unproductive', label: 'Unproductive', color: 'blue' },
                    { value: 'neutral', label: 'Neutral', color: 'pink' },
                  ]}
                />
              </div>
            </div>
          </div>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]
        }

        style={{
          padding: '20px 0px',
        }}

      ></PageHeader >
    </>
  );
}
