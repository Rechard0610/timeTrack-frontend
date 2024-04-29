import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';
import useLanguage from '@/locale/useLanguage';

const TaskInputNumber = ({
  entity,
  displayLabels = ['name'],
  outputValue = '_id',
  taskPrefixSelector,
  suffixelector,
  totalBudget,
  value,
  onChange,
}) => {
  const translate = useLanguage();

  const [projectId, setProjectId] = useState('');
  const [currentbudget, setCurrentBudget] = useState(0);
  const [initialbudget, setInitialBudget] = useState(null)

  useEffect(() => {
    if (value && value.currentbudget) {
      console.log(value);
      setProjectId(value.id);
      setInitialBudget(value.currentbudget);  // to save the value when the task is updated so it will sum with remind budget
      setCurrentBudget(value.currentbudget);
      onChange(value.currentbudget)
    }
  }, [value]);

  useEffect(() => {
    if (totalBudget && totalBudget.totalbudget) {
      console.log(totalBudget);
      setProjectId(totalBudget.id);
      setCurrentBudget(totalBudget.totalbudget);
    }
  }, [totalBudget])

  const budgetasync = ({ id }) => {
    return request.budget({ entity: 'task', id: id });
  };

  const handleAsyncOperation = async (id) => {
    try {
      const values = await budgetasync({ id });
      console.log(values.totalbudget);
      console.log(initialbudget);
      setCurrentBudget(values.totalbudget + initialbudget);
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };

  const handleInputChange = (val) => {
    console.log(value);
    if(val === null && initialbudget !== null) { // when he input val is null and mode is updated, it will sum with previos val and remained val
      handleAsyncOperation(projectId);
    } else
      setCurrentBudget(val);
    
    onChange(val);
  };

  return (
    <InputNumber
      addonBefore={taskPrefixSelector}
      addonAfter={suffixelector}
      placeholder={`Less than ${currentbudget === undefined ? '0' : currentbudget}`}
      onChange={handleInputChange}
      value={value}
      style={{
        width: '100%',
      }}
    />
  );
};

export default TaskInputNumber;
