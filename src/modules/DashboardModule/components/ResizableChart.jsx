import React from 'react';
import { useEffect, useState } from 'react';
import { Col } from 'antd';
import { request } from '@/request';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResizableChart = ({ status, dateRange = 7, userId = '', selectedDate=  '' }) => {
  const entity = `dashboard/projectChart`;
  const [projectInfo, setProjectInfo] = useState(null);

  const formatMilliseconds = (milliseconds) => {
    let totalSeconds = Math.floor(milliseconds);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  const hoursToHHMMSS = (hours) => {
    let totalSeconds = hours * 3600; // Convert hours to seconds
    let hh = Math.floor(totalSeconds / 3600);
    let mm = Math.floor((totalSeconds % 3600) / 60);
    let ss = Math.floor(totalSeconds % 60);

    // Add leading zeros if necessary
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;

    return `${hh}:${mm}:${ss}`;
  }

  const dispatcher = async () => {
    const jsonData = { status, range: dateRange, userId, selectedDate };
    const data = await request.post({ entity, jsonData });

    const result = { label: [], spentTime: [], budget: [] };
    if (data.result) {
      data.result.map(item => {
        result.label.push(`${item.projectnumber} ${item.description}`);
        result.spentTime.push(item.spentTime);
        result.budget.push(item.budget)
      })
    }

    setProjectInfo(result);
  };

  useEffect(() => {
    dispatcher();
  }, [userId, selectedDate]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      title: {
        display: true,
        text: status === 'Finished' ? 'Finished Projects' : 'Ongoing Projects',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.datasetIndex === 1) {
              let label = context.dataset.label || '';

              if (label) {
                label += ': ';
              }

              if (context.parsed.y !== null) {
                label += formatMilliseconds(context.parsed.y * 3600);
              }

              return label;
            } else if (context.datasetIndex === 0) {
              let label = context.dataset.label || '';
              label += ':';
              return label += hoursToHHMMSS(context.parsed.y);
            }
          }
        }
      }
    },
  };

  const data = {
    labels: projectInfo && projectInfo.label,
    datasets: [
      {
        label: 'Total time',
        data: projectInfo && projectInfo.budget && projectInfo.budget.map((itm) => itm),
        backgroundColor: 'rgb(244 63 94)',
      },
      {
        label: 'Spent Time',
        data: projectInfo && projectInfo.spentTime && projectInfo.spentTime.map((itm) => itm / 3600),
        backgroundColor: 'green',
      },
    ],
  };

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
        style={{ color: '#595959', fontSize: 13, height: '100%' }}
      >
        <Bar data={data} options={options} />
      </div>
    </Col>
  )


}

export default ResizableChart;



