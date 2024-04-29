import { useState } from 'react';
import { Button, Input, Select, Segmented } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';

const { Search } = Input;

function AddNewPerson({ config }) {
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel } = crudContextAction;

    const handelClick = () => {
        panel.open();
        collapsedBox.close();
    };

    return (
        <Button onClick={handelClick} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
            Invite Person
        </Button>
    );
}
export default function PersonHeader({ config, searchTable }) {
    let { entity, searchConfig } = config;
    const translate = useLanguage();

    return (
        <>
            <PageHeader
                title=""
                extra={[
                    <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1} >
                        <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto minmax(auto, 1070px)" }}>
                            <div className='grid gap-y-1.5'>
                                <p>Search Project</p>
                                <Search placeholder="Search by member mail ..." className='task-search' onSearch={searchTable} enterButton />
                            </div>
                        </div>
                    </div>,
                    <AddNewPerson key={`${uniqueId()}`} config={config} />,
                ]}
                style={{
                    padding: '20px 0px',
                }}
            ></PageHeader>
        </>
    );
}
