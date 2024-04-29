import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'antd';
import DesktimeCard from './desktimeCard';
import { request } from '@/request';

const DeskTime = ({ currentUser, selectedDate }) => {
    const entity = `timeLine/desktimes`;
    const [desktimes, setDeskTimes] = useState([]);
    const mouseClickIdleIndex = 0.4, keyIdleIndex = 0.4, mouseIdleIndex = 0.2;
    const productiveIndex = 0.4, unproductiveIndex = 0.2, neutralIndex = 0.4;
    const startTime = 8;
    const endTime = 17;
    const numOfZeros = (endTime - startTime) * 60 / 5;

    const [chartData, setChartData] = useState({ activity: [], ranking: [], productive: [] });

    const dispatcher = async () => {
        const jsonData = { userId: currentUser, selectedDate };
        const data = await request.post({ entity, jsonData });
        setDeskTimes(data);
    };

    const getDateFormat = (timestamp) => {
        if(timestamp === undefined)
            return;
        const date = new Date(timestamp);
        const hours = date.getUTCHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
        const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
        const formattedTime = `${hours}:${minutes}`; // HH:MM format
        return formattedTime;
    }

    const convertToDate = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        return formattedTime;
    }

    useEffect(() => {
        setChartData({
            activity: Array.from({ length: numOfZeros }, () => 0),
            ranking: Array.from({ length: numOfZeros }, () => 0),
            productive: Array.from({ length: numOfZeros }, () => 0)
        });

        dispatcher();
    }, [currentUser, selectedDate]);

    const updateChartData = (start, value, memberCnt) => {
        const currentTime = new Date(start * 1000);
        const currentHour = currentTime.getUTCHours();
        const currentMinute = currentTime.getUTCMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (currentTimeInMinutes >= startTime * 60 && currentTimeInMinutes <= endTime * 60) {
            const index = Math.floor((currentTimeInMinutes - startTime * 60) / 5);
            // setChartData(prevState => {
            //     const updatedActivity = [...prevState.activity];
            //     const updatedRanking = [...prevState.ranking];
            //     updatedActivity[index] = value; // Update activity at index
            //     updatedRanking[index] = memberCnt; // Update ranking at index
            //     return { ...prevState, activity: updatedActivity, ranking: updatedRanking };
            // });
            chartData.activity[index] = value;
            chartData.ranking[index] = memberCnt;
        }
    }

    const updateRanking = (start, value) => {
        const currentTime = new Date(start * 1000);
        const currentHour = currentTime.getUTCHours();
        const currentMinute = currentTime.getUTCMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (currentTimeInMinutes >= startTime * 60 && currentTimeInMinutes <= endTime * 60) {
            const index = Math.floor((currentTimeInMinutes - startTime * 60) / 5);
            // console.log(chartData.ranking[index]);
            if (chartData.activity[index] < value && chartData.ranking[index] > 0) {
                setChartData(prevState => {
                    // Make a copy of the current state
                    const updatedRanking = [...prevState.ranking];
                    updatedRanking[index] = updatedRanking[index] - 1;
                    return { ...prevState, ranking: updatedRanking };
                });

            }
        }
    }

    const updateProductiveData = (index, value) => {
        setChartData(prevState => {
            // Make a copy of the current state
            const updatedProductivity = [...prevState.productive];
            updatedProductivity[index] = value;
            return { ...prevState, productive: updatedProductivity };
        });
    }

    const getIndex = (start) => {
        const currentTime = new Date(start * 1000);
        const currentHour = currentTime.getUTCHours();
        const currentMinute = currentTime.getUTCMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;
        if (currentTimeInMinutes >= startTime * 60 && currentTimeInMinutes <= endTime * 60) {
            const index = Math.floor((currentTimeInMinutes - startTime * 60) / 5);
            return index;
        }
    }

    const handleChartData = () => {
        const currentUserId = currentUser;
        const memberCnt = desktimes.members;
        // if (desktimes.activity && desktimes.activity.length > 0) {
        // console.log(desktimes.activity);
        // console.log(memberCnt);
        desktimes.activity && desktimes.activity.length > 0 && desktimes.activity.map(activityByUser => {
            if (activityByUser?._id === currentUserId) {
                activityByUser?.active.map(item => {
                    let start = new Date(item.created).getTime() / 1000;
                    if (item.spentType === 'working time' && item.userId === currentUserId) {
                        let mouseIdle = 0, keyIdle = 0, clickIdle = 0, total = 0;
                        item.workData.map((wdata, idx) => {
                            if ((start + total) % 300 < 60 && total > 60) {   /// the time set 1 min
                                const value = Math.floor(Math.abs((total - (mouseIdle * mouseIdleIndex) - (keyIdle * keyIdleIndex) - (clickIdle * mouseClickIdleIndex)) / total * 100));
                                updateChartData(start, value, memberCnt);
                                start += total;
                                mouseIdle = wdata.mouseIdle;
                                keyIdle = wdata.keyIdle;
                                clickIdle = wdata.mouseClickIdle;
                                total = wdata.range;
                            } else {
                                // console.log(wdata.range);
                                mouseIdle += wdata.mouseIdle;
                                keyIdle += wdata.keyIdle;
                                clickIdle += wdata.mouseClickIdle;
                                total += wdata.range;
                            }
                        })
                        const value = Math.floor(Math.abs((total - (mouseIdle * mouseIdleIndex) - (keyIdle * keyIdleIndex) - (clickIdle * mouseClickIdleIndex)) / total * 100));
                        updateChartData(start, value, memberCnt);
                    } else if (item.spentType === 'idle limit') {
                    } else if (item.spentType === 'private time') {
                    }
                })
            }
        });
        // for ranking

        // console.log(chartData);
        desktimes.activity && desktimes.activity.length > 0 && desktimes.activity.map(activityByUser => {
            if (activityByUser?._id !== currentUserId) {
                activityByUser?.active.map(item => {
                    let start = new Date(item.created).getTime() / 1000;
                    // console.log(start);
                    if (item.spentType === 'working time' && item.userId !== currentUserId) {
                        let mouseIdle = 0, keyIdle = 0, clickIdle = 0, total = 0;
                        item.workData.map((wdata, idx) => {
                            if ((start + total) % 300 < 60 && total > 60) {   /// the time set 1 min
                                const value = Math.floor(Math.abs((total - (mouseIdle * mouseIdleIndex) - (keyIdle * keyIdleIndex) - (clickIdle * mouseClickIdleIndex)) / total * 100));
                                updateRanking(start, value);
                                start += total;
                                mouseIdle = wdata.mouseIdle;
                                keyIdle = wdata.keyIdle;
                                clickIdle = wdata.mouseClickIdle;
                                total = wdata.range;
                            } else {
                                // console.log(wdata.range);
                                mouseIdle += wdata.mouseIdle;
                                keyIdle += wdata.keyIdle;
                                clickIdle += wdata.mouseClickIdle;
                                total += wdata.range;
                            }
                        })
                        const value = Math.floor(Math.abs((total - (mouseIdle * mouseIdleIndex) - (keyIdle * keyIdleIndex) - (clickIdle * mouseClickIdleIndex)) / total * 100));
                        updateRanking(start, value);
                    }
                })
            }
        });
        // for productivity
        if (desktimes.productivity && desktimes.productivity.length > 0) {
            // console.log(desktimes.productivity);
            let productive = 0, unproductive = 0, neutral = 0, total = 0, baseIndex = 0;
            desktimes.productivity.map(productiveByUser => {
                if (productiveByUser._id === currentUserId) {
                    productiveByUser?.surveys.map(item => {
                        let start = new Date(item.created).getTime() / 1000 - item.range;
                        const currentIndex = getIndex(start);
                        if (currentIndex == baseIndex) {
                            total += item.range;
                            if (item.typeId == "Productivity") {
                                productive += item.range;
                            } else if (item.typeId == "Unproductivity") {
                                unproductive += item.range;
                            } else {
                                neutral += item.range;
                            }
                        } else {
                            const value = total / 100 * (total - (productive * productiveIndex + unproductive * unproductiveIndex
                                + neutral * neutralIndex))
                            updateProductiveData(baseIndex, value);
                            baseIndex = currentIndex;
                            total = item.range;
                            if (item.typeId == "Productivity") {
                                productive = item.range;
                                unproductive = 0;
                                neutral = 0;
                            } else if (item.typeId == "Unproductivity") {
                                productive = 0;
                                unproductive = item.range;
                                neutral = 0;
                            } else {
                                productive = 0;
                                unproductive = 0;
                                neutral = item.range;
                            }
                        }
                    });
                    const value = total / 100 * (total - (productive * productiveIndex + unproductive * unproductiveIndex
                        + neutral * neutralIndex))
                    updateProductiveData(baseIndex, value);
                }
            })
        }
    }

    useEffect(() => {
        handleChartData();
    }, [desktimes && desktimes.activity]);

    return (
        <>
            <Row gutter={16} style={{ marginBottom: '16px', marginTop: '32px' }}>
                <Col span={8}>
                    <DesktimeCard label={'Arrival Time'} time={getDateFormat(desktimes.startTime)} />
                </Col>
                <Col span={8}>
                    <DesktimeCard label={'Left Time'} time={getDateFormat(desktimes.endTime)} />
                </Col>
                <Col span={8}>
                    <DesktimeCard label={'Worked Time'} time={convertToDate(desktimes.workingTime)} />
                </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={8}>
                    <DesktimeCard label={'Place in Team/Company'} showChart={true} chartData={chartData.ranking} />
                </Col>
                <Col span={8}>
                    <DesktimeCard label={'Activity'} showChart={true} chartData={chartData.activity} />
                </Col>
                <Col span={8}>
                    <DesktimeCard label={'Productivity'} showChart={true} chartData={chartData.productive} />
                </Col>
            </Row>
        </>
    );
}

export default DeskTime;