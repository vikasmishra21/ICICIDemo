import {Chart} from '../../../shell/models/chart';
import {ChartTypes} from '../../../shell/enums/chart.types';
import {Measure} from '../../../shell/enums/measure';
import {ChartProvider} from '../../../shell/enums/chart.provider';
import {RoundOffStrategy} from '../../../shell/enums/round.off.strategy';
import {TimePeriod} from '../../../shell/models/time.period';
import {FilterCondition} from '../../../shell/enums/filter-condition.enum';
import {TableOutput} from '../../../shell/interfaces/table-output';
import {BetaValues} from '../../../model/beta-values';

export class CommentScatter {
  private readonly chart: Chart;

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v26', 'v27', 'v29', 'v30'],
      TopBreak: ['v1'],
      Type: ChartTypes.Scatter,
      Measure: Measure.ColumnPercent
    }, 'Impact on KPIs', ChartProvider.ECharts);
    const combineTexts = ['Wait time', 'Politeness', 'Understand', 'Resolution'];
    this.chart.SideBreak.forEach((value, index) => {
      this.chart.hideSideBreakOptions(index, [1, 2, 3, 4]);
      this.chart.combineSideBreakOptions(value, [1], combineTexts[index]);
    });
    this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    this.chart.addShowOverall(true);
    this.chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    this.chart.addCalculationLogic(output => {
      let tableOutput = output.TableOutput.get(this.chart.Name);
      const betaValues: Array<TableOutput> = new Array<TableOutput>();
      tableOutput.forEach((value, index) => {
        const series = {...value};
        series.Score = BetaValues.value[1][value.SeriesVariableID];
        betaValues.push(series);
      });
      tableOutput = [...tableOutput, ...betaValues];
      output.TableOutput.set(this.chart.Name, tableOutput);
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      config.height = '420px';
      config.width = '100%';
      config.xAxis.splitLine = false;
      config.xAxis.show = true;
      config.yAxis.axisTick = {show: false};
      config.xAxis.axisTick = {show: false};
      config.yAxis.axisLine = {show: true};
      config.tooltip = {
        show: true
      };
      config.grid.containLabel = true;
      config.grid.width = '80%';
      config.grid.height = '90%';
      config.grid.y = '5%';
      config.series[0].itemStyle.normal.color='rgba(0,149,217,.1)';
      config.series[0].itemStyle.normal.borderColor='rgba(0,149,217,1)';
      config.series[0].itemStyle.normal.label.textStyle = {color:'rgba(0,149,217,1)'}
  
      return config;
    });
  }

  getConfig(): Chart {
    return this.chart
  }
}
