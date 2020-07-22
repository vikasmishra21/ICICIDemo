import {Chart} from '../../../shell/models/chart';
import {ChartTypes} from '../../../shell/enums/chart.types';
import {Measure} from '../../../shell/enums/measure';
import {ChartProvider} from '../../../shell/enums/chart.provider';
import {TableOutput} from '../../../shell/interfaces/table-output';
import {ChartProviderConfiguration} from '../../../shell/interfaces/chart-provider-configuration';
import {RoundOffStrategy} from '../../../shell/enums/round.off.strategy';
import {TimePeriod} from '../../../shell/models/time.period';

export class Reasons {
  private readonly chart: Chart;

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v40'],
      TopBreak: ['v1'],
      Type: ChartTypes.HorizontalBar,
      Measure: Measure.ColumnPercent
    }, 'KPIs', ChartProvider.ECharts);
    /*this.chart.SideBreak.forEach((value, index) => {
      this.chart.hideSideBreakOptions(index, [1, 2, 3, 4]);
      this.chart.combineSideBreakOptions(value, [1], combineTexts[index]);
    });*/
    this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    this.chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    this.chart.addCalculationLogic(output => {
      let tableOutput = output.TableOutput.get(this.chart.Name);
      tableOutput.sort((a, b) => a.Score - b.Score);
      tableOutput.forEach((value, index) => {
        value.SeriesName = value.SeriesName.split(' ')[0] + index;
      });
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      config.height = '300px';
      config.width= '450px';
      config.xAxis.splitLine = false;
      config.xAxis.show = true;
      config.xAxis.color="#e4e4e4";
      config.title.text = "Reasons of Visits";
      config.title.textStyle={fontWeight:'lighter',fontFamily:'Muli',fontSize:16,color:'#0095d9'};
      config.title.x = "center";
      config.xAxis.axisLine={lineStyle:{color:'#979696'}};
      config.yAxis.axisLine={lineStyle:{color:'#979696'}};
      config.title.padding=5;
      config.title.y = '2%';
      config.xAxis.axisTick = {show: false};
      config.yAxis.axisTick = {show:false};
      config.yAxis.axisLine = {show:true};
      config.grid.containLabel = true;
      config.grid.width = '95%';
      config.grid.height = '85%';
      config.grid.y = '14%';
      config.series[0].itemStyle={
        normal:{color:'rgba(0,149,217,1)'}
      }
      return config;
    });
  }

  getConfig(): Chart {
    return this.chart
  }
}
