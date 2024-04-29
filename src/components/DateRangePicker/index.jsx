import { useLayoutEffect, useState } from 'react';
import { DatePicker } from 'antd';

import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DateRangePicker = ({ onRangeChange }) => {
    const dispatch = useDispatch();
    const [selectedDays, setSelectedDays] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const dateFormat = 'YYYY-MM-DD';
    const rangePresets = [
        {
            label: 'Today',
            value: [dayjs().add(0, 'd'), dayjs()],
        },
        {
            label: 'Yesterday',
            value: [dayjs().add(-1, 'd'), dayjs()],
        },
        {
            label: 'This Week',
            value: [dayjs().startOf('week'), dayjs().endOf('week')],
        },
        {
            label: 'Last Week',
            value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
        },
        {
            label: 'This Month',
            value: [dayjs().startOf('month'), dayjs().endOf('month')],
        },
        {
            label: 'Last Month',
            value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
        },
        {
            label: 'This year',
            value: [dayjs().startOf('year'), dayjs().endOf('year')],
        },
        {
            label: 'All time',
            value: [dayjs(0), dayjs()]
        },
    ];

    // const onRangeChange = (dates, dateStrings) => {
    //     if (dates) {
    //         if (dates.length === 2) {
    //             const startDate = dates[0];
    //             const endDate = dates[1];
    //             const datesArray = [];
    //             let currentDate = new Date(startDate);
    //             while (currentDate <= endDate) {
    //                 datesArray.push(new Date(currentDate));
    //                 currentDate.setDate(currentDate.getDate() + 1);
    //             }
    //             setSelectedDays(datesArray);
    //             console.log(datesArray);
    //         }
    //         console.log('From: ', dates[0], ', to: ', dates[1]);
    //         console.log('From: ', dateStrings[0], ', to: ', cx);
    //         const range = {startDate: dateStrings[0], endDate: dateStrings[0]}
    //         setDateRange(range);
    //     } else {
    //         console.log('Clear');
    //     }
    // };

    return (
        <>
            <RangePicker
                // defaultValue={dayjs(, dateFormat)}
                className='min-w-64	outline-blue-500 min-h-10'
                presets={rangePresets}
                onChange={onRangeChange}
            />
        </>
    );
}

export default DateRangePicker;
