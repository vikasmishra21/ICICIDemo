import { TableOutput } from "./table-output";

export interface DataTransformable {
  toLine(data: Array<TableOutput>): Array<any>;

  toRing(data: Array<TableOutput>): Array<any>;

  toPie(data: Array<TableOutput>): Array<any>;

  toKPI(data: Array<TableOutput>): Array<any>;

  toHBar(data: Array<TableOutput>): Array<any>;

  toVBar(data: Array<TableOutput>): Array<any>;

  toBar(data: Array<TableOutput>): Array<any>;

  toStacked(data: Array<TableOutput>): Array<any>;

  toStackedBar(data: Array<TableOutput>): Array<any>;

  toMeanChart(data: Array<TableOutput>): Array<any>;

  toScatter(data: Array<TableOutput>): Array<any>;

  toArea(data: Array<TableOutput>): Array<any>;

  // toBubble(data: Array<TableOutput>): Array<any>;
}
