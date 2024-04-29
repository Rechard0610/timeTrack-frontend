import React from 'react';

import useLanguage from '@/locale/useLanguage';

import TimeSheetModule from '@/modules/TimeSheetModule';
import { fields } from './config';

export default function TimeSheet() {
  const translate = useLanguage();
  const entity = 'timeSheet';
  const searchConfig = {
    displayLabels: ['avatar'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('timesheets'),
    DATATABLE_TITLE: translate('timesheets_list'),
    ADD_NEW_ENTITY: translate('add_new_timesheet'),
    ENTITY_NAME: translate('timesheets'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
      <TimeSheetModule
        config={config}
      />
    
  );
}
