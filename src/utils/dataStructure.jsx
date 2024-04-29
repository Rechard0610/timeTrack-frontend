import dayjs from 'dayjs';
import { Switch, Tag, Avatar, Tooltip, Dropdown, Space } from 'antd';
import { CloseOutlined, CheckOutlined, DownOutlined } from '@ant-design/icons';
import { countryList } from '@/utils/countryList';
import { generate as uniqueId } from 'shortid';
import color from '@/utils/color';

export const dataForRead = ({ fields, translate }) => {
  let columns = [];

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    columns.push({
      title: field.label ? field.label : key,
      dataIndex: field.dataIndex ? field.dataIndex.join('.') : key,
      isDate: field.type === 'date',
    });
  });

  return columns;
};

export function dataForTable({ fields, translate, moneyFormatter, dateFormat }) {
  let columns = [];
  const statusItems = [
    {
      key: 'In Quatation',
      label: 'In Quatation',
    },
    {
      key: 'In Progress',
      label: 'In Progress',
    },
    {
      key: 'Finished',
      label: 'Finished',
    },
    {
      key: 'Stalled',
      label: 'Stalled',
    },
  ];

  Object.keys(fields).forEach((key) => {
    let field = fields[key];
    const keyIndex = field.dataIndex ? field.dataIndex : [key];

    const formatTime = (time) => {
      const hours = time.getUTCHours().toString().padStart(2, "0");
      const minutes = time.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const formatTimeFromSeconds = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      const formattedHours = hours === 0 ? '' : `${hours}h `;
      const formattedMinutes = `${minutes}m`;

      return `${formattedHours}${formattedMinutes}`;
    }

    const component = {
      boolean: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        editable: true,
        // onCell: () => ({
        //   props: {
        //     style: {
        //       width: '60px',
        //     },
        //   },
        // }),
        render: (_, record) => (
          <Switch
            checked={record[key]}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        ),
      },
      date: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const date = dayjs(record[key]).format(dateFormat);
          return (
            <Tag bordered={false} color={field.color}>
              {date}
            </Tag>
          );
        },
      },
      currency: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        onCell: () => {
          return {
            style: {
              textAlign: 'right',
              whiteSpace: 'nowrap',
            },
          };
        },
        render: (_, record) =>
          moneyFormatter({ amount: record[key], currency_code: record.currency }),
      },
      async: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          // console.log(record.);
          return (
            field.displayLabels.map(item => {
              return record[key] && record[key][item];
            })
          );
        },
      },
      clientname: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            field.displayLabels.map(item => {
              return record[key] && record[key][item];
            })
          );
        },
      },
      color: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            <Tag bordered={false} color={text}>
              {color.find((x) => x.value === text)?.label}
            </Tag>
          );
        },
      },
      stringWithColor: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            <Tag bordered={false} color={record.color || field.color}>
              {text}
            </Tag>
          );
        },
      },
      tag: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          return (
            <Tag bordered={false} color={field.color}>
              {record[key] && record[key]}
            </Tag>
          );
        },
      },
      teams: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          // console.log(record);
          return (
            record[key] && record[key].map(teamname => (
              <Tag bordered={false} color={'blue'} key={record._id}>
                {teamname}
              </Tag>
            ))
          );
        },
      },
      budget: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            // <Tag bordered={false} color={field.color}>
            record[key] && record[key]
            // </Tag>
          );
        },
      },
      selectWithFeedback: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && translate(record[key])}
              </Tag>
            );
          } else return record[key] && translate(record[key]);
        },
      },
      select: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && record[key]}
              </Tag>
            );

          } else if (record[key] && record[key] === 'projectmanger')
            return record[key] && translate('project manager');
          else return record[key] && translate(record[key]);
        },
      },
      selectWithTranslation: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          if (field.renderAsTag) {
            const selectedOption = field.options.find((x) => x.value === record[key]);

            return (
              <Tag bordered={false} color={selectedOption?.color}>
                {record[key] && translate(record[key])}
              </Tag>
            );
          } else return record[key] && translate(record[key]);
        },
      },
      array: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const tags = [];
          if (record[key]) {
            record[key].forEach(item => {
              const option = field.options.find(option => option.value === item);
              // If the option with a color property is found, use its color, otherwise use a default color
              const color = option ? option.color : 'defaultColor';
              tags.push(
                <Tag bordered={false} key={`${uniqueId()}`} color={color} >
                  {item}
                </Tag>
              );
            });
          }
          return tags;
        },
      },
      country: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          const selectedCountry = countryList.find((obj) => obj.value === record[key]);

          return (
            <Tag bordered={false} color={field.color || undefined}>
              {selectedCountry?.icon && selectedCountry?.icon + ' '}
              {selectedCountry?.label && translate(selectedCountry.label)}
            </Tag>
          );
        },
      },
      asyncbudget: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          return (
            <Tooltip title={record.project && record.project.description} placement="top" key={record._id}>
              {`${record.project && record.project.projectnumber}`}
            </Tooltip>
          );
        },
      },
      projectnumber: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (_, record) => {
          return (
            <Tooltip title={record.description} placement="top" key={record._id}>
              {`${record.projectnumber}`}
            </Tooltip>
          );
        },
      },
      status: {
        title: field.label ? translate(field.label) : translate(key),
        key: 'operation',
        render: (_, record) => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                statusItems,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
      avatargroup: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          // const selectedOption = countryList.find((obj) => obj.value === record[key]);
          const users = record.people;
          if (users && users.length !== 0) {
            const assignAvatar = users.assign?.map((element, index) => {
              return <Tooltip title={`${element.firstname} ${element.lastname}`} placement="top" key={element._id}>
                <Avatar
                  style={{
                    backgroundColor: '#1677ff',
                  }}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(index + 3) * 2}`}
                />
              </Tooltip>
            });

            const teamAvatar = users.team?.map((people, index) => {
              return people.people.map((element, index) => {
                return <Tooltip title={`${element.firstname} ${element.lastname} (${people.teamname})`} placement="top" key={element._id}>
                  <Avatar
                    style={{
                      backgroundColor: '#1677ff',
                    }}
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(index + 3) * 2}`}
                  />
                </Tooltip>
              })
            });

            return (
              <Avatar.Group>
                {assignAvatar}
                {teamAvatar}
              </Avatar.Group>
            );
          }
        },
      },
      avatars: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          const users = record.people;
          console.log(users);
          if (users && users.length > 0) {
            const avatars = users.map((element, index) => {
              // console.log(element._id);
              return <Tooltip title={`${element.firstname} ${element.lastname}`} placement="top" key={element._id}>
                <Avatar
                  style={{
                    backgroundColor: '#1677ff',
                  }}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(index + 3) * 2}`}
                />
              </Tooltip>
            });
            return (
              <Avatar.Group>
                {avatars}
              </Avatar.Group>
            );
          }
        },
      },
      member: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          return (
            <Tooltip title={`${record.firstname} ${record.lastname}`} placement="top" key={record._id}>
              <Avatar
                style={{
                  backgroundColor: '#1677ff',
                }}
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(8) * 2}`}
              />
            </Tooltip>
          );
        },
      },
      avatar: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          if (record[key])
            return (
              <Tooltip title={`${record[key].firstname} ${record[key].lastname}`} placement="top" key={record._id}>
                <Avatar
                  style={{
                    backgroundColor: '#1677ff',
                  }}
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${(8) * 2}`}
                />
                <p className='pt-1'>{record[key].initials}</p>
              </Tooltip>
            );
        },
      },
      totalweek: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          console.log(record);
          return (
            record[key] && record[key].name
          );
        },
      },
      manualdate: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          let date, formattedDate;
          if (record) {
            date = new Date(record.starttime);
            formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
          }
          return (
            formattedDate
          );
        },
      },
      percentage: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          const percentage = record[key] && record[key].toFixed(2);
          return (
            `${percentage}%`
          )
        }
      },
      timeformat: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          const totalTime = formatTimeFromSeconds(record[key]);
          return (
            totalTime
          )
        }
      },
      editable: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        editable: true, // This property makes the column editable
        // onCell: (record) => ({
        //   editable: true, // Ensure the cell is editable
        //   record
        // }),
        render: (text, record) => {
          return (
            record[key]
          )
        }
      },
      timeformatwithhour: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          let totalSeconds = record[key] * 3600; // Convert hours to seconds
          let hh = Math.floor(totalSeconds / 3600);
          let mm = Math.floor((totalSeconds % 3600) / 60);
          let ss = Math.floor(totalSeconds % 60);
          // Add leading zeros if necessary
          hh = hh < 10 ? '0' + hh : hh;
          mm = mm === 0 ? '' : mm < 10 ? '0' + mm : mm;
          ss = ss < 10 ? '0' + ss : ss;
          let timeformat = '';
          timeformat = mm == '' ? `${hh}h` : `${hh}h ${mm}m`;
          return (
            timeformat
          )
        }
      },
      timerange: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          let formattedStartTime, formattedEndTime;
          if (record) {
            const startTime = new Date(record.starttime);
            const endTime = new Date(record.endtime);
            formattedStartTime = formatTime(startTime);
            formattedEndTime = formatTime(endTime);
          }
          return (
            `${formattedStartTime} - ${formattedEndTime}`
          );
        },
      },
      totaltime: {
        title: field.label ? translate(field.label) : translate(key),
        dataIndex: keyIndex,
        render: (text, record) => {
          let totalTime;
          if (record) {
            const startTime = new Date(record.starttime);
            const endTime = new Date(record.endtime);
            // const totalSeconds = Math.floor((endTime - startTime) / 1000);
            // const hours = Math.floor(totalSeconds / 3600);
            // const minutes = Math.floor((totalSeconds % 3600) / 60);
            // const seconds = totalSeconds % 60;
            totalTime = formatTime(new Date(endTime - startTime));
          }
          return (
            totalTime
          );
        },
      },
    };
    const defaultComponent = {
      title: field.label ? translate(field.label) : translate(key),
      dataIndex: keyIndex,
    };

    const type = field.type;

    if (!field.disableForTable) {
      Object.keys(component).includes(type)
        ? columns.push(component[type])
        : columns.push(defaultComponent);
    }
  });

  return columns;
}

function getRandomColor() {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  // Generate a random index between 0 and the length of the colors array
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Return the color at the randomly generated index
  return colors[randomIndex];
}
