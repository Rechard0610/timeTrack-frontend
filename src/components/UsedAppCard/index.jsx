import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { selectListItems, selectUpdatedItem } from '@/redux/crud/selectors';
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import { crud } from '@/redux/crud/actions';
import { ErpLayout } from '@/layout';
import PageLoader from '@/components/PageLoader';
import { request } from '@/request';
import ChromeCard from './ChromeCard'
import SlackCard from './SlackCard'
import UrlCard from './UrlCard'
import SkypeCard from './SkypeCard'

import { Button, Avatar, Modal } from 'antd';

export default function UsedAppCard({ config, conditions, isEdit = true }) {
    console.log(conditions);
    const { entity } = config;
    const [open, setOpen] = useState(false);
    const [isEnable, setEnable] = useState(false);
    const [currentSelectedName, setCurrentSelectedName] = useState('');
    const currentAdmin = useSelector(selectCurrentAdmin);

    const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isEnable)
            setItems(listResult.items);
    }, [listResult])


    const dispatcher = () => {
        let options;
        console.log(currentAdmin);
        if (currentAdmin.role === 'owner')
            options = { page: 1, items: 1000, 'id': currentAdmin._id, 'inviteId': currentAdmin._id, project: conditions.project, user: conditions.user, startDay: conditions.startDay, endDay: conditions.endDay };
        else {
            options = { page: 1, items: 1000, 'id': currentAdmin._id, project: conditions.project, user: conditions.user, startDay: conditions.startDay, endDay: conditions.endDay };
        }

        console.log(options);

        dispatch(crud.list({ entity, options }));
        setEnable(true);
    };

    useEffect(() => {
        console.log('-------------------------');
        dispatcher();
        const intervalId = setInterval(dispatcher, 300000); // Dispatch every 5 mins
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [entity, conditions]);

    // const onSubmit = (fieldsValue) => {
    //     const id = current._id;

    //     if (fieldsValue.file && withUpload) {
    //         fieldsValue.file = fieldsValue.file[0].originFileObj;
    //     }
    //     // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //     //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //     //   return acc;
    //     // }, {});
    //     dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
    // };

    // useEffect(() => {
    //     if (isSuccess) {
    //         readBox.open();
    //         collapsedBox.open();
    //         panel.open();
    //         form.resetFields();
    //         dispatch(crud.resetAction({ actionType: 'update' }));
    //         dispatch(crud.list({ entity }));
    //     }
    // }, [isSuccess]);

    const timeFormat = (seconds) => {

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${remainingSeconds}s`;
        }
    }

    const handleChangeType = (name) => {
        if(!isEdit)
            return ;
        setOpen(true);
        setCurrentSelectedName(name);
    }

    const updateAppType = (type) => {
        const jsonData = { name: currentSelectedName, type }
        dispatch(crud.update({ entity, jsonData }));
        dispatcher();
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                title="Manage App & URL"
                onCancel={handleCancel}
                className='justify-between grid'
                footer={[]}
            >
                <Button key="productivity" onClick={() => updateAppType('Productivity')} className='mr-5 my-3 text-[green]'>
                    Productive
                </Button>
                <Button key="unproductivity" onClick={() => updateAppType('Unproductivity')} className='mx-5 my-3 text-[red]'>
                    Unproductive
                </Button>
                <Button key="neutral" onClick={() => updateAppType(null)} className='ml-5 my-3 text-[grey]'>
                    Neutral
                </Button>
            </Modal>
            {Object.keys(items).map((key) => (
                console.log('========================================='),
                <div className='mt-2' key={key}>
                    {
                        key == 0 &&
                        <p className='text-[15px] text-slate-500'>{items[key].date}</p>
                    }
                    {
                        key !== 0 && items[key - 1] && items[key - 1].date != items[key].date &&
                        <p className='text-[15px] text-slate-500'>{items[key].date}</p>
                    }
                    <div className='border-l-2 border-l-green-400'>
                        <div className='p-4 m-4 rounded-md border-2 mt-4'>
                            <div className='grid justify-between gap-4' style={{ gridTemplateColumns: "auto auto" }}>
                                <div className="user-select-item">
                                    <div>
                                        <Avatar
                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                            size="middle"
                                        />
                                    </div>
                                    <span className="sc-JrDLc bmdBHG">{`${items[key].userDetails && items[key].userDetails.firstname} ${items[key].userDetails && items[key].userDetails.lastname}`}</span>
                                </div>
                                <div className='grid' style={{ gridTemplateColumns: "auto auto auto" }}>
                                    <div className='grid gap-2 align-center rounded-md px-3 py-5'>
                                        <p className='text-center'>{timeFormat(items[key].sumValue)}</p>
                                        <p>Total Time</p>
                                    </div>
                                </div>
                            </div>
                            <div className='grid justify-between' style={{ gridTemplateColumns: "47% 47%" }}>
                                <div className=''>
                                    <p className='font-bold'>Apps</p>
                                    <div className='grid gap-3 pt-3' style={{ gridTemplateColumns: "32% 32% 32%" }}>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[green] float-left'>Productive</p>
                                                <p className='text-[green] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === 'Productivity') {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.app !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === 'Productivity' && item.docs.map(itm => {
                                                    if (itm.app !== '') {
                                                        return <UrlCard key={itm._id} name={itm.app} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.app)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[red] float-left'>Unproductive</p>
                                                <p className='text-[red] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === 'Unproductivity') {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.app !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === 'Unproductivity' && item.docs.map(itm => {
                                                    if (itm.app !== '') {
                                                        return <UrlCard key={itm._id} name={itm.app} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.app)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[grey] float-left'>Neutral</p>
                                                <p className='text-[grey] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === null) {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.app !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === null && item.docs.map(itm => {
                                                    if (itm.app !== '') {
                                                        return <UrlCard key={itm._id} name={itm.app} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.app)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className=''>
                                    <p>URLs</p>
                                    <div className='grid gap-3 pt-3' style={{ gridTemplateColumns: "32% 32% 32%" }}>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[green] float-left'>Productive</p>
                                                <p className='text-[green] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === 'Productivity') {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.url !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === 'Productivity' && item.docs.map(itm => {
                                                    if (itm.url !== '') {
                                                        return <UrlCard key={itm._id} name={itm.url} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.url)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[red] float-left'>Unproductive</p>
                                                <p className='text-[red] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === 'Unproductivity') {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.url !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === 'Unproductivity' && item.docs.map(itm => {
                                                    if (itm.url !== '') {
                                                        return <UrlCard key={itm._id} name={itm.url} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.url)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                        <div>
                                            <div className='flow-root'>
                                                <p className='text-[grey] float-left'>Neutral</p>
                                                <p className='text-[grey] float-right mr-2'>
                                                    {
                                                        items[key].docs && items[key].docs.map(item => {
                                                            if (item.typeId === null) {
                                                                let total = 0;
                                                                item.docs.map(itm => itm.url !== '' && (total += itm.range));
                                                                return timeFormat(total)
                                                            }
                                                        })
                                                    }
                                                </p>
                                            </div>
                                            {items[key].docs && items[key].docs.map(item => {
                                                return item.typeId === null && item.docs.map(itm => {
                                                    if (itm.url !== '') {
                                                        return <UrlCard key={itm._id} name={itm.url} range={timeFormat(itm.range)} type={itm.typeId} onClick={() => handleChangeType(itm.url)} />;
                                                    }

                                                    return null;
                                                })
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {
                listIsLoading &&
                <ErpLayout>
                    <PageLoader />
                </ErpLayout>
            }
        </div>
    );
}