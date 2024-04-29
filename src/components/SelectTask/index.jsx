import { useState, useEffect } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { Select, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';
import useLanguage from '@/locale/useLanguage';

const SelectTask = ({
    entity,
    className = '',
    searchFields = 'project',
    placeholder = 'Task',
    displayLabels = ['name'],
    outputValue = '_id',
    parentId = '',
    showAll = '',
    value,
    onChange,
}) => {
    const translate = useLanguage();
    const [selectOptions, setOptions] = useState([]);
    const [currentValue, setCurrentValue] = useState(undefined);

    const navigate = useNavigate();

    const asyncList = () => {
        const isID = /^[a-fA-F0-9]{24}$/.test(parentId);
        if (parentId[0] || isID) {
            const options = {
                project: parentId,
                fields: searchFields,
            };
            return request.list({ entity, options });
        } else
            return request.list({ entity });
    };
    const { result, isLoading: fetchIsLoading, isSuccess } = useFetch(asyncList);

    const handleChangeId = async () => {
        setCurrentValue(null);
        // onChange();
        const { result } = await asyncList();
        setOptions(result);
    }

    useEffect(() => {
        isSuccess && setOptions(result);
    }, [isSuccess]);


    useEffect(() => {
        if (parentId !== '') {
            handleChangeId();
        }
    }, [parentId]);

    const labels = (optionField) => {
        return displayLabels.map((x) => optionField[x]).join(' ');
    };
    useEffect(() => {
        let val = value;
        if (value !== undefined && value) {
            console.log('-----------------------');
            console.log(value);
            val = value[outputValue] ?? value;
            setCurrentValue(val);
            onChange(val);
        }
    }, [value]);

    const handleSelectChange = (newValue) => {
        const val = newValue[outputValue] ?? newValue;
        setCurrentValue(newValue);
        onChange(val);
    };

    const optionsList = () => {
        const list = [];

        // if (selectOptions.length === 0 && withRedirect) {
        //   const value = 'redirectURL';
        //   const label = `+ ${translate(redirectLabel)}`;
        //   list.push({ value, label });
        // }
        if (selectOptions) {
            selectOptions.map((optionField) => {
                const value = optionField[outputValue] ?? optionField;
                const label = labels(optionField);
                const currentColor = optionField[outputValue]?.color ?? optionField?.color;
                const labelColor = color.find((x) => x.color === currentColor);
                list.push({ value, label, color: labelColor?.color });
            });

            return list;
        }
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
                    <Select.Option key={`${uniqueId()}`} value={option.value}>
                        {option.label}
                    </Select.Option>
                );
            })}
            {/* {withRedirect && (
        <Select.Option value={'redirectURL'}>{`+ ` + translate(redirectLabel)}</Select.Option>
      )} */}
        </Select>
    );
};

export default SelectTask;
