import {IValidation} from '@dashboard/utils';
import {ISelect} from '@dashboard/ui';

type IType =
  | 'AutoComplete'
  | 'CheckBox'
  | 'DatePicker'
  | 'SelectForm'
  | 'TextArea'
  | 'TextField';

export interface IField {
  items: ISelect[];
  label: string;
  hint: string;
  model: string;
  placeholder?: string;
  type: IType;
  validation?: IValidation[] | undefined;
  hide?: boolean;
  name: string;
  status?: boolean;
  disabled?: boolean;
  typeInput?: string;
  onChange: (value: string) => void;
}

export interface IForm {
  title: string;
  hide?: boolean;
  rows: IField[];
}
