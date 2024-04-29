import { useState } from 'react';

import { Button, Input, Select, Segmented } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import useLanguage from '@/locale/useLanguage';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';
import SelectAsync from '@/components/SelectAsync';

const { Search } = Input;

function AddTeam({ config }) {
    const { crudContextAction } = useCrudContext();
    const { collapsedBox, panel } = crudContextAction;

    const handelClick = () => {
        panel.open();
        collapsedBox.close();
    };

    return (
        <Button onClick={handelClick} type="primary" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7 right'>
            Add Team
        </Button>
    );
}
export default function TeamHeader({ config, filterTable }) {
    let { entity } = config;
    const translate = useLanguage();

    const handleChangeTeam = (value) => {
        console.log(value);
        const options = { filter: 'people', equal: value };
        console.log(options);
        filterTable(options);
    }

    return (
        <>
            <PageHeader
                title=""
                extra={[
                    <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1} >
                        <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto minmax(auto, 1120px)" }}>
                            <div className='grid gap-y-1.5'>
                                <p>Team Members</p>
                                <SelectAsync
                                    className="min-w-48	outline-blue-500 min-h-10"
                                    entity='admin'
                                    showAll='true'
                                    displayLabels={['firstname', 'lastname']}
                                    onChange={handleChangeTeam}
                                ></SelectAsync>
                            </div>
                        </div>
                    </div>,
                    <AddTeam key={`${uniqueId()}`} config={config} />
                ]}
                style={{
                    padding: '20px 0px',
                }}
            ></PageHeader>
        </>
    );
}
