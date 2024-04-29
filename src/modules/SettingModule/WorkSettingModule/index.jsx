import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { Form, Row, Col, InputNumber, Divider, Typography, Button, Select, Checkbox } from 'antd';
import moment from 'moment-timezone';
import { currencyList } from '@/pages/Currency/currencyList'
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import { request } from '@/request';

const { Title, Text } = Typography;

export default function WorkSettingModule({ config }) {
  const translate = useLanguage();
  const entity = 'worksetting';
  const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [form] = Form.useForm();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [currentId, setCurrentId] = useState();
  const [initialValues, setInitialValues] = useState()

  function getTimezoneOptions() {
    const timezones = moment.tz.names().map(timezone => {
      const offset = moment.tz(timezone).format('Z');
      const abbreviation = moment.tz(timezone).zoneAbbr();
      return {
        value: timezone,
        label: `(GMT${offset}) Africa, ${timezone.split('/')[1]}, ${abbreviation}`,
      };
    });
    return timezones;
  }
  const timezoneOptions = getTimezoneOptions();

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const generateTimeIntervals = () => {
    const intervals = [];
    for (let hours = 0; hours <= 12; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        intervals.push(`${hours}h ${minutes}m`);
      }
    }
    return intervals;
  }

  const timeIntervals = generateTimeIntervals();
  const timeOptions = generateTimeOptions();

  const dispatcher = async () => {
    const options = { userId: currentAdmin._id }
    const data = await request.list({ entity, options });
    const result = data?.result;
    if (result.length > 0) {
      form.setFieldValue(result[0]);
      setInitialValues(result[0]);
      setCurrentId(result[0]._id);
    } else {
      console.log("-----------------------");
      setInitialValues({
        workStart: '08:30',
        workEnd: '17:30',
        minimumHours: '8h 0m',
        timezone: systemTimezone,
        timeformat: '24',
        companycurrency: 'USD',
        flexiblehour: false,
        workingDays: {
          MO: true,
          TU: true,
          WE: true,
          TH: true,
          FR: true,
          SA: false,
          SU: false,
        }
      })
    }
  }

  useEffect(() => {
    dispatcher();
  }, []);

  const handleButtonClick = (day) => {
    const newSelectedDays = { ...initialValues.workingDays };
    newSelectedDays[day] = !newSelectedDays[day];
    setInitialValues({ ...initialValues, workingDays: newSelectedDays });
    form.setFieldsValue({ workingDays: newSelectedDays });
  };

  const onSubmit = async (selectedField) => {
    console.log(selectedField);
    selectedField.userId = currentAdmin._id;
    const jsonData = selectedField;
    console.log(jsonData);
    if (currentId) {
      const data = await request.update({ entity, id: currentId, jsonData });
      const id = data?.result?._id;
      setCurrentId(id);
    } else {
      await request.create({ entity, jsonData });
    }
  }

  const wrapLayout = {
    xl: { span: 24 },
    lg: { span: 24 },
    md: { span: 24 },
    sm: { span: 24 },
    xs: { span: 24 },
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Title level={4}>Working days</Title>
        </Col>
        <Col {...wrapLayout}>
          <Form.Item label="Select days" name="workingDays">
            <div>
              {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((day) => (
                <Button
                  key={day}
                  shape="circle"
                  className={`text-[#fff] mr-3 my-5 w-[50px] h-[50px] text-[16px] bold 
                    ${initialValues && initialValues['workingDays'][day] ? 'bg-green-500' : 'text-green-500'}`}
                  onClick={() => handleButtonClick(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </Form.Item>
        </Col>
        <Col {...wrapLayout}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="Work starts" name="workStart">
                <Select style={{ width: 220, height: 40 }}>
                  {timeOptions.map((time, index) => (
                    <Select.Option key={index} value={time}>
                      {time}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Work ends" name="workEnd">
                <Select style={{ width: 220, height: 40 }}>
                  {timeOptions.map((time, index) => (
                    <Select.Option key={index} value={time}>
                      {time}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Minimum hours" name="minimumHours">
                <Select style={{ width: 220, height: 40 }}>
                  {timeIntervals.map((time, index) => (
                    <Select.Option key={index} value={time}>
                      {time}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Form.Item label="Felxible Hours" name="flexiblehour">
            <Checkbox>
              Flexible working hours
            </Checkbox>
          </Form.Item>
        </Col>
        <Divider />
        <Col {...wrapLayout}>
          <Row gutter={24}>
            <Col span={10}>
              <Form.Item label="Timezone" name="timezone">
                <Select style={{ width: 350, height: 40 }}>
                  {timezoneOptions.map((option, index) => (
                    <Select.Option key={index} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Time format" name="timeformat">
                <Select style={{ width: 120, height: 40 }}>
                  <Select.Option value="12">12</Select.Option>
                  <Select.Option value="24">24</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Company Currency" name="companycurrency">
                <Select style={{ width: 120, height: 40 }} showSearch>
                  {currencyList.map((value, index) => (
                    <Select.Option key={index} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col {...wrapLayout}>
          <Button type="primary" htmlType="submit" className='text-[white] bg-teal-300 min-h-10 px-8 cursor-pointer mt-7'>
            {translate('Submit')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
