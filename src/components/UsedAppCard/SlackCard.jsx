import { useEffect } from 'react';

import { Progress } from 'antd';
import slackIcon from '@/style/images/slack.svg';


export default function SlackCard( ) {
    const data = {"name" : "Chrome", "time": "1h 4m", "process": "94"}
    return (
        <div className='grid rounded-lg item-center p-3 border-2 gap-4' style={{gridTemplateColumns: "36px 1fr"}}>
            <img src={slackIcon} width="100%" alt="slack" />
            <div className='grid gap-1'>
                <p>{data.name}</p>
                <p>{data.time}</p>
            </div>
            <div></div>
            <Progress percent={data.process} className='mb-0'/>
        </div>
    );
}