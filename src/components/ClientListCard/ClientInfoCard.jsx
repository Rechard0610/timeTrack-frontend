import { useEffect } from 'react';

import { Tooltip, Tag } from 'antd';
import { EditOutlined, SwitcherOutlined } from '@ant-design/icons';

export default function ClientInfoCard({ data, editItem, removeItem }) {
    // const data = { "name": "Matthew Kenneth", "status": "Not Invoiced yet" }
    console.log(data);
    return (
        <div className='relative mt-4'>
            <div className='grid rounded-lg items-center p-3 border-2 gap-4' style={{ gridTemplateColumns: "40px auto" }}>
                <div className='text-[16px] flex items-center justify-center w-[40px] h-[40px] rounded-full text-white' style={{ background: "rgb(115, 192, 255)" }}>{data.name && data.name.charAt(0)}</div>
                <div>
                    <div className='grid gap-1 mb-2'>
                        <p>{data.name}</p>
                    </div>
                    <Tag className='rounded-full py-0.5 px-3' color="warning">{`${data.hourlyrate} ${data.currency} / hour`}</Tag>
                </div>
            </div>
            <div className="absolute grid gap-2" style={{ top: "-12px", right: "15px", gridTemplateColumns: "1fr 1fr 1fr" }} >
                <div className="client-card-control" onClick={editItem}>
                    <Tooltip placement="top" title="Edit">
                        <EditOutlined />
                    </Tooltip>
                </div>
                <div className="client-card-control" onClick={editItem}>
                    <Tooltip placement="top" title="Archive">
                        <SwitcherOutlined />
                    </Tooltip>
                </div>
                <div className="client-card-control" onClick={removeItem}>
                    <Tooltip placement="top" title="Remove">
                        X
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}