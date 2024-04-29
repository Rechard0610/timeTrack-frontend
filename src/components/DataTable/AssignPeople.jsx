import { useState, useEffect, useRef } from 'react';

import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

import {
    SearchOutlined,
    UserAddOutlined
} from '@ant-design/icons';

import { Avatar, Input, Select, Divider, Space } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function AssignPeople({
    entity = 'admin',
    displayLabels = ['firstname', 'lastname'],
    searchFields = 'firstname, lastname',
    outputValue = '_id',
    showAll = '',
    redirectLabel = 'Add New',
    value, /// this is for update
    onChange, /// this is for update
}) {
    const translate = useLanguage();

    const [selectOptions, setOptions] = useState([]);
    const [currentValue, setCurrentValue] = useState(undefined);

    const isUpdating = useRef(true);
    const isSearching = useRef(false);

    const [searching, setSearching] = useState(false);

    const [valToSearch, setValToSearch] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();

    const handleSelectChange = (newValue) => {
        isUpdating.current = false;
        if (newValue.length === 0) {
            setCurrentValue(undefined); // set nested value or value  
        } else
            setCurrentValue(newValue); // set nested value or value

        if (onChange) {
            if (newValue && newValue.length !== 0) {
                onChange(newValue[outputValue] || newValue);
            } else
                onChange(undefined);
        }

    };

    // const handleOnSelect = (value) => {
    //   setCurrentValue(value[outputValue] || value); // set nested value or value
    // };

    const [, cancel] = useDebounce(
        () => {
            //  setState("Typing stopped");
            setDebouncedValue(valToSearch);
        },
        500,
        [valToSearch]
    );

    const asyncSearch = async (options) => {
        return await request.search({ entity, options });
    };

    let { onFetch, result, isSuccess, isLoading } = useOnFetch();

    const labels = (optionField) => {
        return displayLabels.map((x) => optionField[x]).join(' ');
    };

    useEffect(() => {
        const options = {
            q: debouncedValue,
            fields: searchFields,
        };
        const callback = asyncSearch(options);
        onFetch(callback);

        return () => {
            cancel();
        };
    }, [debouncedValue]);

    const onSearch = (searchText) => {
        isSearching.current = true;
        setSearching(true);
        // setOptions([]);
        // setCurrentValue(undefined);
        setValToSearch(searchText);
    };

    useEffect(() => {
        if (isSuccess) {
            setOptions(result);
        } else {
            setSearching(false);
            // setCurrentValue(undefined);
            // setOptions([]);
        }
    }, [isSuccess, result]);

    useEffect(() => {
        // this for update Form , it's for setField
        if (value && isUpdating.current) {
            setOptions([value]);
            // setCurrentValue(value[outputValue] || value); // set nested value or value
            onChange(value[outputValue] || value);
            isUpdating.current = false;
            var selectedVal = [];
            // value.map(element => {
            //     selectedVal.push(element[outputValue] || element);
            // })

            // setCurrentValue(selectedVal);
        }
    }, [value]);

    return (
        <Select
            className='user-select-btn rounded-full border-2 border-dotted'
            placeholder={<UserAddOutlined className='text-lg text-emerald-400' />}
            suffixIcon={null}
            onChange={handleSelectChange}
            dropdownRender={(menu) => (
                <>
                    <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Divider style={{ margin: '8px 0' }} />
                    {menu}
                </>
            )}
            options={
                showAll !== ''
                    ? [
                        {
                            label: (
                                <div disabled="" className="user-select-item">
                                    <div>
                                        <Avatar
                                            style={{ verticalAlign: 'middle' }}
                                            size="middle"
                                        />
                                    </div>
                                    <span>{`Not assigned`}</span>
                                </div>
                            ),
                            value: 'all',
                        },
                        ...selectOptions.map((item, index) => ({
                            label: (
                                <div disabled="" className="user-select-item">
                                    <div>
                                        <Avatar
                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                                            style={{ verticalAlign: 'middle' }}
                                            size="middle"
                                        />
                                    </div>
                                    <span>{`${item.firstname} ${item.lastname}`}</span>
                                </div>
                            ),
                            value: item._id,
                        })),
                    ]
                    : selectOptions.map((item, index) => ({
                        label: (
                            <div disabled="" className="user-select-item">
                                <div>
                                    <Avatar
                                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                                        style={{ verticalAlign: 'middle' }}
                                        size="middle"
                                    />
                                </div>
                                <span>{`${item.firstname} ${item.lastname}`}</span>
                            </div>
                        ),
                        value: item._id,
                    }))
            }
        />
    );

}
