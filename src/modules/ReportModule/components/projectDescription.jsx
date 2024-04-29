import React, { useEffect, useRef, useState } from 'react';
import { Tooltip, Table } from 'antd';

import { request } from '@/request';

const ProjectDescription = ({ config }) => {
    console.log(config)
    const { entity } = config;

    // const entity = 'timeLine/timedescription'

    // const [timeDescription, setTimeDescription] = useState([]);
    // const [totalSpentTime, setTotalSpentTime] = useState(0);

    // const changeTimeFormat = (seconds) => {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds % 3600) / 60);
    //     if (hours === 0) {
    //         return `${minutes}m`;
    //     } else {
    //         return `${hours}h ${minutes}m`;
    //     }
    // }

    // const dispatcher = async () => {
    //     const jsonData = { userId: currentUser, selectedDate };
    //     const data = await request.post({ entity, jsonData });
    //     const results = data.result;
    //     const projectdescription = [];
    //     let totalTime = 0;
    //     if (results.length > 0) {
    //         console.log(results);
    //         results.map((project, index) => {
    //             totalTime += project.spentTime;
    //             projectdescription.push({ key: project._id, projectnumber: project.projectName[0], task: '', time: changeTimeFormat(project.spentTime), description: project.description });
    //             project.tasks.map((item, idx) => {
    //                 projectdescription.push({ key: item.key, projectnumber: '', task: item.name[0], time: changeTimeFormat(item.spentTime) });
    //             })
    //         })
    //     }
    //     setTimeDescription(projectdescription);
    //     setTotalSpentTime(totalTime);
    // };  

    // useEffect(() => {
    //     dispatcher();
    // }, [currentUser, selectedDate]);

    const columns = [
        {
            title: 'Project Number',
            dataIndex: 'projectnumber',
            render: (text, record) => (
                <Tooltip title={record.description}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Task',
            dataIndex: 'task',
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            align: 'right',
        },
    ];

    return (
        <div className={`pt-5 px-3 w-full`}>
            <Table
                columns={columns}
                // dataSource={timeDescription}
            />
        </div>
    );
}

export default ProjectDescription;