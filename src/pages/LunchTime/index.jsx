import EditableModule from '@/modules/EditableModule/EditableModule';
import DynamicForm from '@/forms/DynamicForm';
import { lunchFields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Tasks() {
  const lunchEntity = 'lunch';
  
  const config = {
    lunchEntity,
    lunchFields,
  };
  return (
    <EditableModule
      config={config}
    />
  );
}
