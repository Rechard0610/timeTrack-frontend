import { useState } from 'react';

import { Button, Input, Select, Segmented } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';

const { Search } = Input;

function AddClient({ config }) {
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;

  const handelClick = () => {
    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handelClick} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
      Create Client
    </Button>
  );
}
export default function ClientHeader({ config, setAlignValue, filterTable }) {
  const translate = useLanguage();

  const handleAlignmentChange = (value) => {
    setAlignValue(value); // Call setAlignValue to update the alignValue state in parent component
  };

  return (
    <>
      <PageHeader
        title=""
        extra={[
          <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1}>
            <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto minmax(auto, 1060px)" }}>
              <div className='grid gap-y-1.5'>
                <p>Search Client</p>
                <Search placeholder="Search by task name ..." className='task-search' onSearch={filterTable} enterButton />
              </div>
            </div>
          </div>,
          <AddClient key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
    </>
  );
}
