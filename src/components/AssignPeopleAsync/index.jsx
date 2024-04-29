import { useState, useEffect, useRef } from 'react';

import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

import { Select, Empty } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { autoBatchEnhancer } from '@reduxjs/toolkit';

export default function AssignPeopleAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',
  redirectLabel = 'Add New',
  withRedirect = false,
  urlToRedirect = '/',
  value, /// this is for update
  onChange, /// this is for update
}) {
  const translate = useLanguage();

  const addNewValue = { value: 'redirectURL', label: `+ ${translate(redirectLabel)}` };

  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);

  const isUpdating = useRef(true);
  const isSearching = useRef(false);

  const [searching, setSearching] = useState(false);

  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleSelectChange = (newValue) => {
    console.log(newValue);
    isUpdating.current = false;

    if (newValue.length === 0) {
      setCurrentValue(undefined);
    } else {
      setCurrentValue(newValue);
    }

    // Separate selections into 'assignPeople' and 'team'
    const assignPeopleSelections = [];
    const teamSelections = [];

    console.log(newValue);

    // Separate selections into 'assignPeople' and 'team'
    newValue.forEach(value => {
      // Check if the value corresponds to 'assignPeople' or 'team'
      const isAssignPeople = selectOptions[0].options.some(option => option.value === value);

      // Push the value to the appropriate array
      if (isAssignPeople) {
        assignPeopleSelections.push(value);
      } else {
        teamSelections.push(value);
      }
    });

    // Now you have separate arrays for 'assignPeople' and 'team' selections
    console.log("Assign People Selections:", assignPeopleSelections);
    console.log("Team Selections:", teamSelections);

    // Now you have separate arrays for 'assignPeople' and 'team' selections
    // console.log("Assign People Selections:", assignPeopleSelections);
    // console.log("Team Selections:", teamSelections);

    // // Call onChange with the arrays if onChange is provided
    // if (onChange) {
    if (assignPeopleSelections.length === 0 && teamSelections.length === 0) {
      onChange(undefined);
    } else
      onChange({
        assign: assignPeopleSelections,
        team: teamSelections
      });
  }


  const [, cancel] = useDebounce(
    () => {
      //  setState("Typing stopped");
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  const asyncSearch = async (options) => {
    const searchPromises = entity.map(async (item) => {
      // Perform an asynchronous search operation for each item in the entity array
      return await request.search({ entity: item, options });
    });

    // Wait for all asynchronous search operations to complete
    const results = await Promise.all(searchPromises);
    let optionList = [];
    const mapResultToOptions = (result, label) => {
      return result.map((item) => ({
        key: item._id,
        value: item._id,
        label: label === 'assignPeople' ? `${item.firstname} ${item.lastname}` : item.teamname,
      }));
    };

    results.forEach((item, index) => {
      const options = mapResultToOptions(item.result, index === 0 ? 'assignPeople' : 'team');
      const categoryTitle = index === 0 ? 'assign people' : 'team';
      const categoryLabel = <span>{index === 0 ? 'Assign People' : 'Team'}</span>;

      optionList.push({
        options: options,
        title: categoryTitle,
        label: categoryLabel,
      });
    });

    setOptions(optionList);

  };

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  useEffect(() => {
    const options = {
      q: debouncedValue,
      fields: searchFields,
    };
    const callback = asyncSearch(options);
    // onFetch(callback);

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
    // console.log(value);
    // this for update Form , it's for setField
    if (value && isUpdating.current) {
      setOptions([value]);
      onChange(value[outputValue] || value);
      isUpdating.current = false;
      var selectedVal = [];

      const assignPeopleIds = value.assign.map(selection => selection._id);
      // Extract _id from each object in the teamSelections array
      const teamIds = value.team.map(selection => selection._id);

      // Now you have arrays of _id values for assignPeopleSelections and teamSelections
      // console.log("Assign People IDs:", assignPeopleIds);
      // console.log("Team IDs:", teamIds);
      selectedVal = [...assignPeopleIds, ...teamIds];
      setCurrentValue(selectedVal);
    }
  }, [value]);

  return (
    <Select
      loading={isLoading}
      mode="multiple" // Enable multiple selection mode
      showSearch
      allowClear
      placeholder={translate('Search')}
      defaultActiveFirstOption={false}
      filterOption={false}
      notFoundContent={searching ? '... Searching' : <Empty />}
      value={currentValue}
      onSearch={onSearch}
      options={selectOptions}
      onClear={() => {
        // setCurrentValue(undefined);
        setSearching(false);
      }}
      onChange={handleSelectChange}
      style={{ minWidth: '220px' }}
    >
    </Select>
  );
}
