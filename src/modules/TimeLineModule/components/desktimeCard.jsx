import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Row, Col, Button, Modal, Slider, Input, TimePicker, Radio, Card } from 'antd';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { request } from '@/request';

import LineChart from './lineChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const DeskTimeCard = ({ label, time, showChart, chartData }) => {
    return (
        <Card title={label} bordered={false} >
            <p className='text-[green] text-[20px]'>{time}</p>
            { showChart && <LineChart chartData={chartData}  /> }
        </Card>
    );
}

export default DeskTimeCard;