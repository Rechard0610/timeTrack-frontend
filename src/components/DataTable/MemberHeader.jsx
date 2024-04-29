import { useState } from 'react';
import { Input, Select } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import SelectAsync from '@/components/SelectAsync';

const { Search } = Input;

export default function MemberHeader({ config, filterTable }) {
  let { searchConfig } = config;
  const [filter, setFilter] = useState({id: '', role: '', q: '', fields: searchConfig?.searchFields || ''});

  const handleChangeTeam = (value) => {
    filter.id = value;
    const options = filter;
    filterTable(options);
  }

  const handleChangeGroup = (value) => {
    filter.role = value;
    const options = filter;
    filterTable(options);
  }

  const searchTable = (value) => {
    filter.q = value;
    const options = filter;
    filterTable(options);
  }


  return (
    <>
      <PageHeader
        title=""
        extra={[
          <div className='grid justify-between' style={{ gridTemplateColumns: "auto auto" }} key={1} >
            <div className='grid gap-x-5 justify-start ' style={{ gridTemplateColumns: "auto auto auto minmax(auto, 1020px)" }}>
              <div className='grid gap-y-1.5'>
                <p>User Group</p>
                <Select
                  variant="outlined"
                  className='min-w-48	outline-blue-500 min-h-10'
                  placeholder="User Group"
                  defaultValue={''}
                  onChange={handleChangeGroup}
                  options={[
                    { value: '', label: 'All' },
                    { value: 'admin', label: 'Admin' },
                    { value: 'projectmanager', label: 'Project Manager' },
                    { value: 'user', label: 'User' },
                    { value: 'guest', label: 'Guest' },
                  ]}
                />
              </div>
              <div className='grid gap-y-1.5'>
                <p>Team</p>
                <SelectAsync
                  className="min-w-48	outline-blue-500 min-h-10"
                  entity='team'
                  showAll='true'
                  displayLabels={['teamname']}
                  onChange={handleChangeTeam}
                ></SelectAsync>
              </div>
              <div className='grid gap-y-1.5'>
                <p>Search Project</p>
                <Search placeholder="Search by member mail ..." className='task-search' onSearch={searchTable} enterButton />
              </div>
            </div>
          </div>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
    </>
  );
}
