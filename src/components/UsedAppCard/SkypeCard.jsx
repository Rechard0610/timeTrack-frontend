import { useEffect } from 'react';

import { Progress } from 'antd';
import skypeIcon from '@/style/images/skype.svg';


export default function SkypeCard( ) {
    const data = {"name" : "Chrome", "time": "1h 4m", "process": "94"}
    return (
        <div className='grid rounded-lg item-center p-3 border-2 gap-4' style={{gridTemplateColumns: "36px 1fr"}}>
            <img src={skypeIcon} width="100%" alt="slack" />
            <div className='grid gap-1'>
                <p>{data.name}</p>
                <p>{data.time}</p>
            </div>
            <div></div>
            <Progress percent={data.process} className='mb-0'/>
        </div>
    );
}