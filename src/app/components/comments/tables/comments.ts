import {Chart} from '../../../shell/models/chart';
import {ChartTypes} from '../../../shell/enums/chart.types';
import {Measure} from '../../../shell/enums/measure';
import {ChartProvider} from '../../../shell/enums/chart.provider';
import {RoundOffStrategy} from '../../../shell/enums/round.off.strategy';
import {TimePeriod} from '../../../shell/models/time.period';
import {FilterCondition} from '../../../shell/enums/filter-condition.enum';

export class Comments {
  private readonly chart: Chart;

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v43'],
      TopBreak: [],
      Type: ChartTypes.Table,
      Measure: Measure.ColumnPercent
    }, 'Comments', ChartProvider.ECharts);
    this.chart.addCollectionFilter('v1', [TimePeriod.CurrentPeriod], FilterCondition.AnyItemSelected);
    this.chart.addCalculationLogic(output => {
      return output
    }, RoundOffStrategy.AfterCalculation);
  }

  getConfig(): Chart {
    return this.chart
  }
}
