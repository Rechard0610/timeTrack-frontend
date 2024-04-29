import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generate as uniqueId } from 'shortid';
import useLanguage from '@/locale/useLanguage';

const SelectAsync = ({
  entity,
  className = '',
  displayLabels = ['name'],
  outputValue = '_id',
  redirectLabel = '',
  showAll = '',
  withRedirect = false,
  urlToRedirect = '/',
  placeholder = 'select',
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

  const handleSelectChange = (newValue) => {
    if (newValue === 'redirectURL') {
      navigate(urlToRedirect);
    } else {
      const val = newValue[outputValue] ?? newValue;
      setCurrentValue(newValue);
      onChange(val);
    }
  };

  const optionsList = () => {
    const list = [];

    // if (selectOptions.length === 0 && withRedirect) {
    //   const value = 'redirectURL';
    //   const label = `+ ${translate(redirectLabel)}`;
    //   list.push({ value, label });
    // }
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
      defaultValue={showAll && ''}
      className={className}
    >
      {
        showAll &&
        <Select.Option value='' title="All">
          All
        </Select.Option>
      }
      {optionsList()?.map((option) => {
        return (
          <Select.Option key={`${uniqueId()}`} value={option.value} title={option.description}>
            {option.label}
          </Select.Option>
        );
      })}
      {withRedirect && (
        <Select.Option value={'redirectURL'}>{`+ ` + translate(redirectLabel)}</Select.Option>
      )}
    </Select>
  );
};

export default SelectAsync;
