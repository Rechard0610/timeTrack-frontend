import { Col } from 'antd';
import { useEffect, useState } from 'react';
import { request } from '@/request';;
import { TrophyOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function TimeSheetCard({ data, isLoading = false }) {

    const entity = `dashboard/timeSheet`;
    const [weekDays, setWeekDays] = useState([]);

    const getRange = () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        console.log(endOfWeek);

        const range = {
            startDate: startOfWeek.setUTCHours(0, 0, 0, 0),
            endDate: endOfWeek.setUTCHours(23, 59, 59, 999),
        };

        return range;
    }

    const getDateAndDayOfWeek = (dateArray) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        // const startOfWeek = new Date(Math.min(...dateArray.map(item => new Date(item._id))));
        // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        // const endOfWeek = new Date(startOfWeek);
        // endOfWeek.setDate(endOfWeek.getDate() + 7);

        const weekDates = [];
        let totalSecondsSum = 0;

        for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().split('T')[0];
            if (date.getDate() === endOfWeek.getDate()) continue; // Skip the last day

            const item = dateArray.find(item => item._id.includes(dateString)) || { totalSpentTime: 0 };

            const currentDate = new Date(dateString);
            let dayOfWeek;
            if (date < new Date()) {
                dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
            } else if (date.getDate() === endOfWeek.getDate()) {
                dayOfWeek = 'weekly';
            } else {
                dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
            }

            const totalSeconds = Math.floor(item.totalSpentTime);
            totalSecondsSum += totalSeconds;

            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            weekDates.push({ date: currentDate.getDate(), dayOfWeek, times: formattedTime });
        }

        const totalHours = Math.floor(totalSecondsSum / 3600);
        const totalMinutes = Math.floor((totalSecondsSum % 3600) / 60);
        const totalSeconds = totalSecondsSum % 60;
        const formattedTotalTime = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;

        weekDates.push({ date: 'total', dayOfWeek: 'weekly', times: formattedTotalTime });

        return weekDates;

    }

    const dispatcher = async () => {
        const range = getRange();
        const jsonData = { range, 'limit': 5 };
        const data = await request.post({ entity, jsonData });
        const results = data.result;
        const weekDays = getDateAndDayOfWeek(results);

        console.log(weekDays);

        setWeekDays(weekDays);
    };

    useEffect(() => {
        dispatcher();
    }, []);

    return (
        <Col
            className="gutter-row"
            xs={{ span: 48 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 12 }}
        >
            <div
                className="whiteBox shadow p-5"
                style={{ color: '#595959', fontSize: 13, minHeight: '212px', height: '100%' }}
            >
                <div className="strong justify-center">
                    <div
                        style={{
                            margin: '2px 0',
                        }}
                    >
                        <span className='font-bold text-[16px]'>TimeSheet</span>
                        <span className='ml-5'>All Projects</span>
                        <span className='right text-emerald-500 cursor-pointer'>See More</span>
                    </div>
                </div>
                <div className='grid mt-4 justify-between' style={{ gridTemplateColumns: "23.5% 23.5% 23.5% 23.5%", rowGap: "10px" }}>
                    {
                        weekDays && weekDays.map((timeSheet, index) => (
                            <div key={index}>
                                <p className='ml-0.5'>{timeSheet.dayOfWeek} {timeSheet.date}</p>
                                <div className={`sheet-item ${index === 7 && "bg-[#86efbc]"}`} >
                                    <ClockCircleOutlined className={`text-emerald-400 ${index === 7 && "text-white"}`} />
                                    <span className={`ml-2 text-[13px] ${index === 7 && "text-white"}`}>{timeSheet.times}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Col>
    );
}
