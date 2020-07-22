import {FilterDataSource} from '../enums/filter-data-source';
import {FilterType} from '../enums/filter-type';

export class FilterConfig {
  actAs: FilterType;
  variable: string;
  type: number;
  visibility: boolean;
  isNested: boolean;
  isMultiSelected?: boolean;
  variableText?: string;
  placeHolder?: string;
  dataSource?: FilterDataSource;
  dataFilePath?: string;
  default: string[];
  maxSelectionLimit?: number;
  minSelectionLimit?: number;
  enableSubmitButton?: boolean;
  hideOptions?: string[];
}
