import { useEffect } from 'react';

import { Progress } from 'antd';
import { SlackOutlined } from '@ant-design/icons';


export default function UrlCard({ name, range, type, onClick }) {
    return (
        <div className='grid rounded-lg items-center p-1 border-2 gap-x-3 mt-2 cursor-pointer' style={{ gridTemplateColumns: "20px 1fr" }} onClick={onClick}>
            <div className='text-[12px] flex items-center justify-center w-[20px] h-[20px] rounded-full text-white' style={type === null ? { background: 'grey' } : { background: type === 'Productivity' ? 'green' : 'red' }}>{name.at(0)}</div>
            <div className='justify-between grid' style={{ gridTemplateColumns: "auto auto" }}>
                <span className='text-[11px]'>{name}</span>
                <span className='text-[11px]'>{range}</span>
            </div>
            <div>
            </div>
        </div>
    );
}