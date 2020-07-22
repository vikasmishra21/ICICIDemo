import {Chart} from '../../../shell/models/chart';
import {ChartTypes} from '../../../shell/enums/chart.types';
import {Measure} from '../../../shell/enums/measure';
import {ChartProvider} from '../../../shell/enums/chart.provider';
import {TableOutput} from '../../../shell/interfaces/table-output';
import {ChartProviderConfiguration} from '../../../shell/interfaces/chart-provider-configuration';
import {RoundOffStrategy} from '../../../shell/enums/round.off.strategy';
import {TimePeriod} from '../../../shell/models/time.period';

export class KPI {
  private readonly chart: Chart;
  private readonly combineTexts = {
    v26: 'Wait time', v27: 'Politeness', v29: 'Understand', v30: 'Resolution'
  };
  private diffs = []

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v26', 'v27', 'v29', 'v30'],
      TopBreak: ['v1'],
      Type: ChartTypes.HorizontalBar,
      Measure: Measure.ColumnPercent
    }, 'KPIs', ChartProvider.ECharts);
    this.chart.SideBreak.forEach((value, index) => {
      this.chart.hideSideBreakOptions(index, [1, 2, 3, 4]);
      this.chart.combineSideBreakOptions(value, [1], this.combineTexts[value]);
    });
    this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    this.chart.addShowOverall(true);
    this.chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    this.chart.addCalculationLogic(output => {
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      this.diffs.length = 0;
      output.map(value => this.diffs.push(Math.round(value.Difference)));
      config.height = '320px';
      config.width = '470px';
      config.xAxis.splitLine = false;
      config.xAxis.show = true;
      config.xAxis.name="";   
      config.xAxis.axisLine={lineStyle:{color:'#979696'}};
      config.yAxis.axisLine={lineStyle:{color:'#979696'}};
      config.xAxis.axisTick = {show: false};
      config.yAxis.axisTick = {show: false};
      config.yAxis.axisLine = {show: true};
      config.grid.containLabel = true;
      config.grid.width = '70%';
      config.grid.height = '90%';
      config.grid.y = '0%';      
      config.series[0].itemStyle={
        normal:{color:'rgba(0,149,217,1)'}
      }

      return config;
    });
  }

  getConfig(): Chart {
    return this.chart
  }

  getKpiDiff(){
    return this.diffs;
  }

  getTrend(sideBreak): Chart {
    const trend = new Chart({
      SideBreak: [sideBreak],
      TopBreak: ['v1'],
      Type: ChartTypes.Area,
      Measure: Measure.ColumnPercent
    }, 'NPS-Trend', ChartProvider.ECharts);
    this.chart.SideBreak.forEach((value, index) => {
      this.chart.hideSideBreakOptions(index, [1, 2, 3, 4]);
      this.chart.combineSideBreakOptions(value, [1], this.combineTexts[value]);
    });
    trend.addCalculationLogic(output => {
      let tableOutput = output.TableOutput.get(trend.Name);
      //output.TableOutput.set(trend.Name, tableOutput);
      return output
    }, RoundOffStrategy.AfterCalculation);
    trend.addChartConfigChange((output: TableOutput[], config: ChartProviderConfiguration) => {
      config.yAxis.splitLine = false;
      config.yAxis.show = false;
      config.xAxis.show = false;
      config.grid.y = '20%';	// Sum of these 2
      config.height = '80%';  // should be 100
      config.width = '100%';
      config.grid.width = '100%';
      config.grid.height = '100%';


      config.grid.x = '0%';
      config.yAxis.max = Math.max(...config.series[0].data);
      return config;
    });
    return trend;
  }
}
