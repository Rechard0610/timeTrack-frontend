import { useState, useEffect } from 'react';

import { request } from '@/request';

import { InputNumber, Input } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function ProjectNumber({
  entity,
  value, /// this is for update
  onChange, /// this is for update
}) {
  const translate = useLanguage();
  const [projectnumber, setProjectNumber] = useState();

  const asyncList = () => {
    return request.count({ entity });
  };

  const fetchData = async () => {
    const projects = await asyncList();
    if (projects.result) {
      let projectCnt = projects.result.length;
      let formattedCnt = String(projectCnt + 1).padStart(4, '0');
      setProjectNumber(`2024-${formattedCnt}`);
      onChange(`2024-${formattedCnt}`);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setProjectNumber(e.target.value);
    onChange(e.target.value);
  }

  useEffect(() => {
    if (value) {
      onChange(value);
      setProjectNumber(value);
    } else {
      fetchData();
    }
  }, [])

  return (
    <Input value={projectnumber} style={{ width: '100%' }} onChange={handleChange} />
  );
}
