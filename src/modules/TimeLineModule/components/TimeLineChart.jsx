import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Row, Col, Button, Modal, Slider, Input, TimePicker, Radio } from 'antd';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { request } from '@/request';

import ReactApexChart from 'react-apexcharts';
import SelectAsync from '@/components/SelectAsync';
import SelectTask from '@/components/SelectTask'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { TextArea } = Input;
const mouseClickIdleIndex = 0.4, keyIdleIndex = 0.4, mouseIdleIndex = 0.2
const startTime = 8;
const endTime = 17;
const maxSliderValue = 100;

const TimeLineChart = ({ currentUser, selectedDate }) => {
  const format = 'HH:mm';
  const entity = `timeLine/timeLine`;
  const saveEntity = 'timeLine/saveEditTime'
  let spentTypeOptions = ['idle limit', 'private time']
  let productivityOptions = ['Productivity', 'Neutral', 'Unproductive'];
  const numOfZeros = (endTime - startTime) * 60 / 5;
  const [timeLineData, setTimeLineData] = useState([]);
  const [apexChartsData, setApexChartsData] = useState([]);
  const [chartWidth, setChartWidth] = useState(null);
  const [buttons, setButtons] = useState();
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [startPosOfRange, setStartPosOfRange] = useState(0);
  const [endPosOfRange, setEndPosOfRange] = useState(100);
  const [step, setStep] = useState(1);
  const [currentItemId, setCurrentItemId] = useState('');
  const [startSliderValue, setStartSliderValue] = useState(0);
  const [endSliderValue, setEndSliderValue] = useState(maxSliderValue);
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [selectedSpentType, setSpentType] = useState('idle limit');
  const [typeButtons, showTypeButtons] = useState();
  const [selectedProductive, setSelectedProductive] = useState();

  const [barData, setBarData] = useState({ value: [], label: [] });

  const dispatcher = async () => {
    const jsonData = { userId: currentUser, selectedDate };
    const data = await request.post({ entity, jsonData });
    const results = data.result;
    setTimeLineData(results);
  };

  const generateLabels = () => {
    const labels = [];
    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const timeStr = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
        const nextMinute = minute + 5;
        const nextHour = nextMinute >= 60 ? hour + 1 : hour;
        const nextMinuteFormatted = nextMinute >= 60 ? '00' : nextMinute;
        const nextHourFormatted = nextMinute >= 60 ? (nextHour < 10 ? '0' + nextHour : nextHour) : hour;
        const nextTimeStr = `${nextHourFormatted}:${nextMinuteFormatted}`;
        labels.push(`${timeStr} - ${nextTimeStr}`);
      }
    }
    return labels;
  };

  useEffect(() => {
    const labels = generateLabels();
    setBarData({ value: Array.from({ length: numOfZeros }, () => 0), label: labels });
    dispatcher();
  }, [currentUser, selectedDate]);

  useEffect(() => {
    const updateChartWidth = () => {
      if (chartRef.current) {
        const apexGraphical = document.querySelector('.apexcharts-graphical');
        if (apexGraphical) {
          const width = apexGraphical.getBoundingClientRect().width;
          setChartWidth(width);
        }
      }
    };

    window.addEventListener('resize', updateChartWidth);
    updateChartWidth(); // Initial width calculation

    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);

  const updateBarData = (start, value) => {
    const currentTime = new Date(start * 1000);
    const currentHour = currentTime.getUTCHours();
    const currentMinute = currentTime.getUTCMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    if (currentTimeInMinutes >= startTime * 60 && currentTimeInMinutes <= endTime * 60) {
      const index = Math.floor((currentTimeInMinutes - startTime * 60) / 5);
      // if (barData.value[index] === 1)
      barData.value[index] = value; // Replace 'Current Data' with your actual data
      // else
      //   barData.value[index] = (value + barData.value[index]) / 2;
    }
  }

  const handleBarData = () => {
    if (timeLineData.length > 0) {
      timeLineData.map(item => {
        let start = new Date(item.created).getTime() / 1000;
        if (item.spentType === 'working time') {
          let mouseIdle = 0, keyIdle = 0, clickIdle = 0, total = 0, totalTime = 0;
          item.workData.map((wdata, idx) => {

            if ((start + total) % 300 < 60 && total > 60) {   /// the time set 1 min
              const value = Math.floor(Math.abs((total - (mouseIdle * mouseIdleIndex) - (keyIdle * keyIdleIndex) - (clickIdle * mouseClickIdleIndex)) / total * 100));
              updateBarData(start, value);
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
          updateBarData(start, value);
        } else if (item.spentType === 'idle limit') {
        } else if (item.spentType === 'private time') {
        }
      })
    }
  }

  const getTimeFormat = (timeInSeconds) => {
    const dateFromMilliseconds = new Date(timeInSeconds * 1000);
    const hours = String(dateFromMilliseconds.getUTCHours()).padStart(2, '0'); // Get hours in UTC format
    const minutes = String(dateFromMilliseconds.getUTCMinutes()).padStart(2, '0'); // Get minutes in UTC format
    const seconds = String(dateFromMilliseconds.getUTCSeconds()).padStart(2, '0'); // Get minutes in UTC format

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    return formattedTime;
  }

  const generateAnnotations = () => {
    const buttons = timeLineData.map((item, index) => {
      const createdTime = new Date(item.created);
      const createdTimestamp = createdTime.getTime() / 1000;
      const startTimestamp = new Date(createdTime.setUTCHours(startTime, 0, 0, 0)) / 1000;
      const endTimestamp = new Date(createdTime.setUTCHours(endTime, 0, 0, 0)) / 1000;
      let timeRange;

      if (item.spentType === 'private time') {
        timeRange = item.workData[0].privateTime;
      } else {
        timeRange = item.timeRange;
      }

      let startPos = (((createdTimestamp - startTimestamp) / (endTimestamp - startTimestamp)) * 100);
      let buttonWidth = ((timeRange / (endTimestamp - startTimestamp)) * 100);
      if ((buttonWidth + startPos) > 100) {
        buttonWidth = 100 - startPos;
      }

      if (startPos < 0) {
        buttonWidth += startPos;
        startPos = 0;
      }

      // console.log(item.spentType);
      // console.log(startPos);
      // console.log(buttonWidth);

      return (
        <div
          key={item._id}
          style={{
            position: 'absolute',
            left: `${startPos}%`,
            width: `${buttonWidth}%`,
            height: '20px',
            backgroundColor: item.spentType == 'working time' ? `rgb(113, 201, 113)` : item.spentType === 'idle limit' ? '#DEBA8B' : '#82bdd8',
            color: `#fff`,
            textAlign: 'center',
            lineHeight: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          className={item.spentType == 'working time' ? `chart-working-btn` : item.spentType === 'idle limit' ? 'chart-idle-btn' : 'chart-private-btn'}
          title={`${item.spentType}, ${getTimeFormat(timeRange)}`}
          onClick={() => handleButtonClick(item)}
        >
        </div>
      );
    });

    return buttons
  };

  useEffect(() => {
    handleBarData();
    const buttons = generateAnnotations();
    setButtons(buttons);
    const data = ({
      series: [{
        name: 'activity',
        data: barData.value
      }],
      options: {
        chart: {
          type: 'bar',
          height: '200px',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: 0,
                to: 100,
                color: 'rgb(95, 185, 42)'
              }]
            },
          }
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          labels: {
            show: false, // Hide x-axis labels
          }
        },
        yaxis: {
          max: 100,
          labels: {
            formatter: function (y) {
              return (y) + "%"; // Adjusted to display 20%, 40%, 60%, 80%
            }
          }
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          fillSeriesColor: false,
          theme: 'light',
          style: {
            fontSize: '12px',
          },
          marker: {
            show: true,
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
          x: {
            formatter: function (val, { seriesIndex, dataPointIndex, w }) {
              return barData.label[dataPointIndex];
            }
          }
        },
      },
    });

    setApexChartsData(data);

  }, [timeLineData])

  // Handle button click
  const handleButtonClick = (item) => {
    console.log(item.timeRange);
    console.log(item.created);
    const start = new Date(item.created).getTime() / 1000;
    const end = start + parseFloat(item.timeRange.toFixed(20));
    console.log(end - start);
    console.log(new Date(start * 1000));
    if (item.spentType === 'private time') {
      return;
    } else if (item.spentType === 'idle limit') {
      showTypeButtons(false);
      setProjectId('');
      setTaskId('');
    } else if (item.spentType === 'working time') {
      setProjectId(item.projectId);
      setTaskId(item.taskId);
      showTypeButtons(true);
      setSpentType('idle limit');
    }

    setCurrentItemId(item._id);
    setStartSliderValue(0);
    setEndSliderValue(100);
    // Slider
    setStartPosOfRange(start);
    setEndPosOfRange(end);
    // setStep(100 / (item.timeRange / 60));
    console.log(100 / (item.timeRange / 60));

    setOpen(true);

  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSaveEditTime = async () => {
    const range = endPosOfRange - startPosOfRange;
    console.log(range)
    const start = startPosOfRange + range / 100 * startSliderValue;
    const end = endPosOfRange - range / 100 * (100 - endSliderValue);
    console.log(start);
    console.log(end);
    console.log(description);
    console.log(projectId);
    console.log(taskId);
    console.log(selectedSpentType);
    console.log(selectedProductive);
    const jsonData = { userId: currentUser, start, end, description, projectId, taskId, selectedSpentType, selectedProductive };
    const data = await request.post({ entity:saveEntity, jsonData });
    const results = data.result;
  } 

  const handleChangeEditTimeRange = (values) => {
    setStartSliderValue(values[0]);
    setEndSliderValue(values[1]);
  };

  const getTimestampFromSliderValue = (value) => {
    const range = endPosOfRange - startPosOfRange;
    // console.log(startPosOfRange + (range * (value / maxSliderValue)));
    return startPosOfRange + (range * (value / maxSliderValue));
  };

  const handleChangeProject = (value) => {
    setSpentType('working time');
    setProjectId(value);
  }

  const handleChangeTask = (value) => {
    if (value == null)
      return;
    if (selectedSpentType != 'working time') {
      setSelectedProductive('Neutral');
    }
    setSpentType('working time');
    setTaskId(value);
  }

  const handleChangeSpentType = (e) => {
    console.log(e.target.value);
    setSpentType(e.target.value);
  }

  const handleChangeProductivity = (e) => {
    setSelectedProductive(e.target.value);
  }

  useEffect(() => {
    if (chartRef.current) {
      const apexGraphical = document.querySelector('.apexcharts-graphical');
      if (apexGraphical) {
        const width = apexGraphical.getBoundingClientRect().width;
        setChartWidth(width);
      }
    }
  }, [chartRef.current]);

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '40px' }}>
      {apexChartsData.options && <ReactApexChart ref={chartRef} options={apexChartsData.options} series={apexChartsData.series} type="bar" height="200px" />}
      <div className="relative	-mt-7 h-[20px] bg-slate-300" style={{ width: `${chartWidth}px`, marginLeft: '62px' }}>
        <div className="absolute inset-0 bg-grey-200 " style={{ width: `${chartWidth}px` }}>
        </div>
        {buttons}
      </div>
      <Modal
        open={open}
        title="Edit tracked time"
        onCancel={handleCancel}
        footer={[
          <Button key="close" loading={loading} onClick={handleCancel}>
            CLOSE
          </Button>,
          <Button key="save"
            onClick={handleSaveEditTime}
          >
            SAVE
          </Button>,
        ]}
      >
        <p>Adjust, specify or delete the whole tracked time period or parts of it.</p>
        <Row justify="center" align="middle" className='py-5'>
          <Col span={4}>
            <TimePicker
              value={dayjs.unix(Math.floor(getTimestampFromSliderValue(startSliderValue)))}
              format={format}
              onChange={(value) => setStartSliderValue(getTimestampFromSliderValue(value.unix()))} />
          </Col>
          <Col span={1} style={{ textAlign: 'center' }}> {/* Add a 1-span Col for spacing */}
            {/* Leave this Col empty or add any content for spacing */}
          </Col>
          <Col span={4}>
            <TimePicker
              value={dayjs.unix(Math.floor(getTimestampFromSliderValue(endSliderValue)))}
              format={format}
              onChange={(value) => setEndSliderValue(getTimestampFromSliderValue(value.unix()))} />
          </Col>
        </Row>
        <Slider
          range
          step={step}
          value={[startSliderValue, endSliderValue]}
          onChange={handleChangeEditTimeRange}
          tooltip={{
            open: false,
          }}
        />
        <Row justify="center" align="middle" className='py-5'>
          <TextArea rows={3} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        </Row>
        <Row justify="center" align="middle" className='py-3'>
          <Col span={10} className='mr-2'>
            <p>Project</p>
            <SelectAsync
              className="min-w-48	outline-blue-500 min-h-10"
              entity='project'
              displayLabels={['projectnumber']}
              onChange={handleChangeProject}
              value={projectId}
            ></SelectAsync>
          </Col>
          <Col span={10} className='ml-2'>
            <p>Task</p>
            <SelectTask
              className="min-w-48	outline-blue-500 min-h-10"
              entity='task'
              displayLabels={['name', 'lastname']}
              parentId={projectId}
              onChange={handleChangeTask} 
              value={taskId}
            />
          </Col>
        </Row>
        {
          typeButtons && <Row justify="center" align="middle" className='py-5'>
            <Radio.Group
              options={spentTypeOptions}
              onChange={handleChangeSpentType}
              defaultValue={selectedSpentType}
              optionType="button"
              buttonStyle="solid"
            />
          </Row>
        }
        {
          !typeButtons && <Row justify="center" align="middle" className='py-5'>
            <Radio.Group
              options={productivityOptions}
              onChange={handleChangeProductivity}
              value={selectedProductive}
              optionType="button"
              buttonStyle="solid"
            />
          </Row>
        }
      </Modal>
    </div>
  );
};

export default TimeLineChart;
