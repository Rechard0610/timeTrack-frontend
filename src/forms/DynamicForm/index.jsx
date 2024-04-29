import { useState, useEffect } from 'react';
import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag, AutoComplete, Button } from 'antd';

import { CloseOutlined, CheckOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useMoney, useDate } from '@/settings';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';
import SelectBudgetAsync from '@/components/SelectBudgetAsync';
import TaskInputNumber from '@/components/TaskInputNumber';
import SelectCurrency from '@/components/SelectCurrency';
import ProjectNumber from '@/components/ProjectNumber';
import AssignPeopleAsync from '@/components/AssignPeopleAsync';
import SelectClient from '@/components/SelectClient';

import { generate as uniqueId } from 'shortid';

import { crud } from '@/redux/crud/actions';
import { useSelector, useDispatch } from 'react-redux';
import { selectListItems } from '@/redux/crud/selectors';

import { restApi } from '@/request';

export default function DynamicForm({ fields, isUpdateForm = false }) {
  const [feedback, setFeedback] = useState();
  const [origins, setOrigins] = useState([]);
  const translate = useLanguage();
  const dispatch = useDispatch();
  const [shouldRenderBudget, setShouldRenderBudget] = useState(true);

  useEffect(() => {
    setShouldRenderBudget(feedback);
  }, [feedback]);

  const asyncSearch = (searchText) => {
    let shortNames = new Array();
    restApi.getRegionInfo(searchText).then(data => {
      data.map((item, index) => {
        shortNames.push({ "value": item.place_name });
      })
      setOrigins(shortNames);
    });

  };
  return (
    <>
      {Object.keys(fields).map((key) => {
        let field = fields[key];
        if (field.type === "address") {
          return (
            <Form.Item
              key={key}
              label={translate(field.label)}
              name={key}
              rules={[
                {
                  required: field.required || false,
                },
              ]}
            >
              <AutoComplete
                options={origins}
                onSearch={(text) => asyncSearch(text)}
              >
              </AutoComplete>
            </Form.Item>
          )
        } else
          if ((isUpdateForm && !field.disableForUpdate) || !field.disableForForm) {
            if (field.type === 'selectCurrency') {
              return <SelectCurrency />;
            } else {
              field.name = key;
              if (!field.label) field.label = key;
              if (field.hasFeedback)
                return (
                  <FormElement
                    feedback={feedback}
                    setFeedback={setFeedback}
                    key={key}
                    field={field}
                  />
                );
              else if (feedback && field.feedback) {
                if (feedback == field.feedback) {
                  return <FormElement key={key} field={field} />;
                }
              } else {
                if (field.label === 'budget' || field.label === 'add sub tasks') {
                  // if(shouldRenderBudget) {
                  return <FormElement key={key} field={field} budget={shouldRenderBudget} />
                  // } 
                } else {
                  return <FormElement key={key} field={field} />;
                }
              }
            }
          }
      })}
    </>
  );
}

function FormElement({ field, feedback, setFeedback, budget }) {
  const translate = useLanguage();
  const money = useMoney();
  const { dateFormat } = useDate();
  const [prefix, setPrefix] = useState('hours');
  const [totalBudget, setTotalBudget] = useState();

  useEffect(() => {
    if (budget && field.label === 'budget') {
      setTotalBudget(budget);
      setPrefix(budget.isfixed == true ? 'fixed' : 'hours');
    } else if( field.label === 'budget' ) {
      const totalBudget = { 'totalbudget': 0, 'isfixed': true }
      setTotalBudget(totalBudget);
    } else if ( budget && field.type === 'selectDefaultTask' ) {
      setTotalBudget(budget);
    }
  }, [budget]);

  const { TextArea } = Input;
  const taskPrefixSelector = (
    <Form.Item name="prefix" noStyle >
      <Select
        style={{
          width: 130,
        }}
        disabled
        defaultValue={prefix}
        onChange={(value) => setPrefix(value)}
      >
        <Option value="fixed">Fixed Price</Option>
        <Option value="hours">Hours</Option>
      </Select>
    </Form.Item>
  );

  const projectPrefixSelector = (
    <Form.Item name="prefix" noStyle >
      <Select
        style={{
          width: 130,
        }}
        defaultValue={prefix}
        onChange={(value) => setPrefix(value)}
      >
        <Option value="fixed">Fixed Price</Option>
        <Option value="hours">Hours</Option>
      </Select>
    </Form.Item>
  );

  const suffixelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        disabled
        suffixIcon={null}
        style={{
          width: 40,
        }}
        defaultValue={prefix}
      >
        <Option value="hours">H</Option>
        <Option value="fixed">$</Option>
      </Select>
    </Form.Item>
  );

  const SelectComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        showSearch={field.showSearch}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value}>
              {option.label}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  const SelectDefaulTasksComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
    >
      <Select
        showSearch={field.showSearch}
        mode="multiple"
        style={{
          width: '100%',
        }}
      >
        { totalBudget && totalBudget.length > 0 && totalBudget.map((option) => {

          return (
            <Select.Option key={`${uniqueId()}`} value={option}>
              {option}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  const SelectWithTranslationComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value}>
              <Tag bordered={false} color={option.color}>
                {translate(option.label)}
              </Tag>
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
  const SelectWithFeedbackComponent = ({ feedbackValue, lanchFeedback }) => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
    >
      <Select
        onSelect={(value) => lanchFeedback(value)}
        value={feedbackValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {translate(option.label)}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
  const ColorComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
        }
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value} label={option.label}>
              <Tag bordered={false} color={option.color}>
                {option.label}
              </Tag>
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
  const TagComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            <Tag bordered={false} color={option.color}>
              {translate(option.label)}
            </Tag>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
  const ArrayComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        mode={'multiple'}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
  const CountryComponent = () => (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      initialValue={field.defaultValue}
    >
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
        }
        style={{
          width: '100%',
        }}
      >
        {countryList.map((language) => (
          <Select.Option
            key={language.value}
            value={language.value}
            label={translate(language.label)}
          >
            {language?.icon && language?.icon + ' '}
            {translate(language.label)}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  const SearchComponent = () => {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
      >
        <AutoCompleteAsync
          entity={field.entity}
          displayLabels={field.displayLabels}
          searchFields={field.searchFields}
          outputValue={field.outputValue}
          withRedirect={field.withRedirect}
          urlToRedirect={field.urlToRedirect}
          redirectLabel={field.redirectLabel}
        ></AutoCompleteAsync>
      </Form.Item>
    );
  };

  const DefaultTask = () => {
    return (
      <Form.List
        label={translate(field.label)}
        name={field.name}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Form.Item
              label={translate(field.label)}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '100%',
                }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
            {fields.map((field, index) => (
              <Form.Item
                required={false}
                key={field.key}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please input task name or remove this field'
                    },
                  ]}
                  {...field}
                  noStyle
                >
                  <Input
                    style={{
                      width: '85%',
                    }}
                  />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>

    );
  };

  const AssignPeopleComponent = () => {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
      >
        <AssignPeopleAsync
          entity={field.entity}
          displayLabels={field.displayLabels}
          searchFields={field.searchFields}
          outputValue={field.outputValue}
          withRedirect={field.withRedirect}
          urlToRedirect={field.urlToRedirect}
          redirectLabel={field.redirectLabel}
        ></AssignPeopleAsync>
      </Form.Item>
    );
  };

  const BudgetComponent = () => {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
      >
        <InputNumber
          addonBefore={projectPrefixSelector}
          addonAfter={suffixelector}
          // placeholder={budget && `Less than ${totalBudget === undefined ? '0' : totalBudget.totalbudget}`}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
    );
  };

  const TaskBudgetComponent = () => {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
      >
        <TaskInputNumber
          entity={field.entity}
          displayLabels={field.displayLabels}
          outputValue={field.outputValue}
          taskPrefixSelector={taskPrefixSelector}
          suffixelector={suffixelector}
          totalBudget={totalBudget}
          placeholder={`Less than ${totalBudget === undefined ? '0' : totalBudget.totalbudget}`}
        ></TaskInputNumber>
      </Form.Item>
    );
  };

  const ProjectNumberComponent = () => {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
      >
        <ProjectNumber
          entity={field.entity}
        ></ProjectNumber>
      </Form.Item>
    );
  };

  const formItemComponent = {
    select: <SelectComponent />,
    status: <SelectComponent />,
    selectWithTranslation: <SelectWithTranslationComponent />,
    selectWithFeedback: (
      <SelectWithFeedbackComponent lanchFeedback={setFeedback} feedbackValue={feedback} />
    ),
    color: <ColorComponent />,

    tag: <TagComponent />,
    array: <ArrayComponent />,
    country: <CountryComponent />,
    search: <SearchComponent />,
    budget: <BudgetComponent />,
    taskbudget: <TaskBudgetComponent />,
    projectnumber: <ProjectNumberComponent />,
    avatargroup: <AssignPeopleComponent />,
    avatars: <SearchComponent />,
// SelectDefaulTasksComponent
    selectDefaultTask: <SelectDefaulTasksComponent />,
    defaulttask: <DefaultTask />,
  };

  const compunedComponent = {
    string: (
      <Input autoComplete="off" maxLength={field.maxLength} defaultValue={field.defaultValue} />
    ),
    url: <Input addonBefore="http://" autoComplete="off" placeholder="www.example.com" />,
    textarea: <TextArea rows={4} />,
    email: <Input autoComplete="off" placeholder="email@example.com" />,
    number: <InputNumber style={{ width: '100%' }} />,
    phone: <Input style={{ width: '100%' }} placeholder="+1 123 456 789" />,
    amount: <Input style={{ width: '100%' }} suffix='$' />,
    boolean: (
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultValue={true}
      />
    ),
    date: (
      <DatePicker
        placeholder={translate('select_date')}
        style={{ width: '100%' }}
        format={dateFormat}
      />
    ),
    async: (
      <SelectAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
      ></SelectAsync>
    ),
    avatar: (
      <SelectAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
      ></SelectAsync>
    ),
    clientname: (
      <SelectClient
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
        setClientTask={setFeedback}
      ></SelectClient>
    ),
    asyncbudget: (
      <SelectBudgetAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
        setBudgetValue={setFeedback}
      ></SelectBudgetAsync>
    ),
    currency: (
      <InputNumber
        className="moneyInput"
        min={0}
        controls={false}
        addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
        addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
      />
    ),
  };

  const filedType = {
    string: 'string',
    textarea: 'string',
    number: 'number',
    phone: 'string',
    //boolean: 'boolean',
    // method: 'method',
    // regexp: 'regexp',
    // integer: 'integer',
    // float: 'float',
    // array: 'array',
    // object: 'object',
    // enum: 'enum',
    // date: 'date',
    url: 'url',
    website: 'url',
    email: 'email',
  };

  const customFormItem = formItemComponent[field.type];
  let renderComponent = compunedComponent[field.type];

  if (!renderComponent) {
    renderComponent = compunedComponent['string'];
  }

  if (customFormItem) return <>{customFormItem}</>;
  else {
    return (
      <Form.Item
        label={translate(field.label)}
        name={field.name}
        rules={[
          {
            required: field.required || false,
            type: filedType[field.type] ?? 'any',
          },
        ]}
        valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
      >
        {renderComponent}
      </Form.Item>
    );
  }
}
