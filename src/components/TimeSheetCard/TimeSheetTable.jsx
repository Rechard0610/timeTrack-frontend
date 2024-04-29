import { useCallback, useEffect } from 'react';

import { Table, Avatar, Tag, Tooltip } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import { format } from 'd3';
// import { dataForTable } from '@/utils/dataStructure';
// import { useMoney, useDate } from '@/settings';

// import { useCrudContext } from '@/context/crud';


export default function TimeSheetTable({ config, selectedDays, conditions, extra = [] }) {
    let { entity, dataTableColumns, fields, searchConfig } = config;
    // const { crudContextAction } = useCrudContext();
    const translate = useLanguage();
    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
    const { pagination, items: dataSource } = listResult;

    const dispatch = useDispatch();

    const getDayOfWeek = (date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date && date.getDay()];
    };

    const getFormattedDay = (date) => {
        if(date) {
            const day = date.getDate();
            const formattedDay = String(day).padStart(2, '0'); // Pad with leading zeros if needed
            return formattedDay;
        }
    }

    const formatMilliseconds = (milliseconds) => {
        let totalSeconds = Math.floor(milliseconds);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    useEffect(() => {
        dispatch(crud.resetState());
    }, [])

    useEffect(() => {
        const options = conditions;
        if (conditions.startDay != '' && conditions.endDay != '')
            dispatch(crud.list({ entity, options }))
    }, [conditions]);

    const renderDayColumn = (record, day) => {
        // console.log(record.days[day.getDate()]);
        const spentTime = record.days && record.days[getFormattedDay(day)];
        if (spentTime) {
            return <Tag className='p-3' color="blue" key={day}>{formatMilliseconds(spentTime)}</Tag>;
        } else {
            return <Tag className='p-3' key={day}>{formatMilliseconds(0)}</Tag>;
        }
    };

    dataTableColumns = [
        {
            title: translate("member"),
            dataIndex: 'avatar',
            width: 40,
            fixed: 'left',
            render: (text, record) => {
                const fullName = record.userId && `${record.userId.firstname} ${record.userId.lastname}`;
                if (record.userId) {
                    return <Tooltip title={fullName} placement="top" key={record.userId._id}>
                        <Avatar
                            style={{
                                backgroundColor: '#1677ff',
                            }}
                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(3) * 2}`}
                        />
                    </Tooltip>
                }
            }
        },
        ...selectedDays.map((date, index) => ({
            title: <div className="justify-center items-center text-center grid">
                <div className="items-center mr-2 mb-1 text-[blue]">{getDayOfWeek(date)}</div>
                <div className="flex h-[40px] w-[40px] border-2 justify-center items-center rounded-md text-center mr-2">
                    {getFormattedDay(date)}
                </div>
            </div>,
            className: 'text-center',
            key: index.toString(),
            render: (_, record) => renderDayColumn(record, date), // Render each day's data
        })),
        {
            title: translate("total hours"),
            dataIndex: 'hour',
            fixed: 'right',
            width: 200,
            render: (text, record) => {
                console.log(record);
                return (
                    <Tag bordered={false} color={text} key={record.userId && record.userId._id}>
                        {formatMilliseconds(record.totalSpentTime)}
                    </Tag>
                );
            }
        },
    ];

    const handelDataTableLoad = useCallback((pagination) => {
        const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
        dispatch(crud.list({ entity, options }));
    }, []);

    console.log(dataSource);

    return (
        <Table
            columns={dataTableColumns}
            rowKey={(item) => item._id}
            dataSource={dataSource}
            pagination={pagination}
            loading={listIsLoading}
            onChange={handelDataTableLoad}
            scroll={{ x: true }}
        />
    );
}