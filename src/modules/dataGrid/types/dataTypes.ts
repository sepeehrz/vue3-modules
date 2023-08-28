import {IValidation} from '@dashboard/utils';
import {ISelect} from '@dashboard/ui';

export interface IHeaders {
  text?: string;
  align?: string;
  sortable?: boolean;
  width?: string;
  value?: string;
  name?: string;
}

export interface ITitle {
  text: string;
  icon?: string;
}
export interface IFilters {
  icon?: string;
  name: string;
  model: string;
  label: string;
  validation?: IValidation[];
  width?: string;
  type: string;
  items: ISelect[];
}
export interface IPagination {
  totalPages: number;
  pageSize: number;
  currentPage: number;
}
export interface IAction {
  title: string;
  icon: string;
  cb: (data: object) => void;
}
