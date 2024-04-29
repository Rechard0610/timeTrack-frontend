import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';
import useLanguage from '@/locale/useLanguage';

const SelectBudgetAsync = ({
  entity,
  displayLabels = ['name'],
  outputValue = '_id',
  redirectLabel = '',
  withRedirect = false,
  urlToRedirect = '/',
  placeholder = 'select',
  setBudgetValue,
  value,
  onChange,
}) => {
  const translate = useLanguage();
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const navigate = useNavigate();

  const asyncList = () => {
    return request.list({ entity });
  };
  const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);
  useEffect(() => {
    isSuccess && setOptions(result);
  }, [isSuccess]);

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };
  useEffect(() => {
    if (value !== undefined) {
      const val = value[outputValue] ?? value;
      setCurrentValue(val);
      onChange(val);
    }
  }, [value]);

  const budgetasync = ({newValue}) => {
    return request.budget({ entity: 'task', id: newValue });
  };

  const handleAsyncOperation = async (newValue) => {
    try {
      const values = await budgetasync({ newValue });
      setBudgetValue(values);
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };

  const handleSelectChange = (newValue) => {
    if (newValue === 'redirectURL') {
      navigate(urlToRedirect);
    } else {
      handleAsyncOperation(newValue); 

      const val = newValue[outputValue] ?? newValue;
      setCurrentValue(newValue);
      onChange(val);
    }
  };

  const optionsList = () => {
    const list = [];
    selectOptions.map((optionField) => {
      const value = optionField[outputValue] ?? optionField;
      const label = labels(optionField);
      const description = optionField.description;
      list.push({ value, label, description: description });
    });

    return list;
  };

  return (
    <Select
      loading={fetchIsLoading}
      disabled={fetchIsLoading}
      value={currentValue}
      onChange={handleSelectChange}
      placeholder={placeholder}
    >
      {optionsList()?.map((option) => {
        return (
          <Select.Option key={`${uniqueId()}`} value={option.value} title={option.description}>
            {/* <Tooltip title={option.description} placement="top" key={option.value}> */}
              {option.label}
            {/* </Tooltip> */}
          </Select.Option>
        );
      })}
      {withRedirect && (
        <Select.Option value={'redirectURL'}>{`+ ` + translate(redirectLabel)}</Select.Option>
      )}
    </Select>
  );
};

export default SelectBudgetAsync;
