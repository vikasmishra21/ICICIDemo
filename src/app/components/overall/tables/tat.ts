import { Chart } from '../../../shell/models/chart';
import { ChartTypes } from '../../../shell/enums/chart.types';
import { Measure } from '../../../shell/enums/measure';
import { ChartProvider } from '../../../shell/enums/chart.provider';
import { TableOutput } from '../../../shell/interfaces/table-output';
import { ChartProviderConfiguration } from '../../../shell/interfaces/chart-provider-configuration';
import { RoundOffStrategy } from '../../../shell/enums/round.off.strategy';
import { TimePeriod } from '../../../shell/models/time.period';

export class TAT {
  private readonly chart: Chart;

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v36'],
      TopBreak: ['v1'],
      Type: ChartTypes.BarChart,
      Measure: Measure.ColumnPercent
    }, 'KPIs', ChartProvider.ECharts);
    this.chart.SideBreak.forEach((value, index) => {
      this.chart.hideSideBreakOptions(index, [1, 2]);
      this.chart.combineSideBreakOptions(value, [1], 'Yes');
    });
    this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    this.chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
    this.chart.addCalculationLogic(output => {
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      for (var i = 0; i < config.series[0].data.length; i++) {
        config.series[0].data[i] = 100;
      }
      // config.series[0].data.forEach(element => {
      //   return 100;
      // });
      config.height = '320px';
      config.width = '100%';
      config.yAxis.splitLine = false;
      config.xAxis.show = false;
      config.yAxis.show = false;
      config.yAxis.axisTick = { show: false };
      config.yAxis.axisLine = { show: false };
      config.grid.containLabel = true;
      config.grid.width = '300px';
      config.grid.height = '75%';
      config.grid.y = '10%';
      config.title.text = "TAT";
      config.title.x = "center";
      config.title.textStyle={fontWeight:'normal',fontFamily:'Muli',fontSize:16,color:'#0095d9'};
      config.title.padding=5;
      config.title.y = '2%';
      config.tooltip.formatter = function (a) {
        return config.series[1].data[0];
      };
      config.series[0].barWidth = 40;
      config.series[1].barWidth = 40;
      config.series[1].itemStyle.normal.label = {};
      config.series[1].itemStyle.normal.label.show = true;
      config.series[1].itemStyle.normal.label.position = 'insideTop';
      config.series[0].itemStyle.normal.color ='rgba(218,218,218,1)';
      config.series[1].itemStyle.normal.color ='rgba(0,149,217,1)';
      // config.series[1].itemStyle.normal.label.position = 'center';
      // config.grid.containLabel = true;
      // config.grid.label.position = 'inside';
      return config;
    });
  }

  getConfig(): Chart {
    return this.chart
  }

  getTrend(): Chart {
    const trend = new Chart({
      SideBreak: ['v10'],
      TopBreak: ['v1'],
      Type: ChartTypes.Line,
      Measure: Measure.ColumnPercent
    }, 'NPS-Trend', ChartProvider.ECharts);

    trend.addChartConfigChange((output: TableOutput[], config: ChartProviderConfiguration) => {
      config.height = '180px';
      config.width = '180px';
      return config;
    });
    return trend;
  }
}
