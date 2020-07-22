import { Chart } from '../../../shell/models/chart';
import { ChartTypes } from '../../../shell/enums/chart.types';
import { Measure } from '../../../shell/enums/measure';
import { ChartProvider } from '../../../shell/enums/chart.provider';
import { TableOutput } from '../../../shell/interfaces/table-output';
import { ChartProviderConfiguration } from '../../../shell/interfaces/chart-provider-configuration';
import { RoundOffStrategy } from '../../../shell/enums/round.off.strategy';
import { TimePeriod } from '../../../shell/models/time.period';
import { BetaValues } from '../../../model/beta-values';

export class KpiImpact {
  private readonly chart: Chart;

  constructor(filter) {
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
        const series = { ...value };
        series.Score = BetaValues.value[filter][value.SeriesVariableID];
        betaValues.push(series);
      });
      tableOutput = [...tableOutput, ...betaValues];
      output.TableOutput.set(this.chart.Name, tableOutput);
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      config.height = '320px';
      config.width = '100%';

      config.xAxis.name = "Satisfaction";
      config.xAxis.nameLocation = 'middle';
      config.xAxis.nameGap = 35;

      config.xAxis.axisLabel = {};
      config.xAxis.axisLabel.show = true;
      config.xAxis.axisLabel.interval = 0;
      // config.xAxis.axisLabel.rotate = 90;

      config.yAxis.name = "Beta Value";
      config.yAxis.nameLocation = 'middle';
      config.yAxis.nameGap = 35;

      config.yAxis.axisLabel = {};
      config.yAxis.axisLabel.show = true;
      config.yAxis.axisLabel.interval = 0;
      config.yAxis.axisLabel.rotate = 90;

      config.xAxis.splitLine = false;
      config.xAxis.show = true;
      config.yAxis.axisTick = { show: false };
      config.xAxis.axisTick = { show: false };
      config.yAxis.axisLine = { show: true };
      config.tooltip = {
        show: true
      };
      config.grid.containLabel = true;
      // config.grid.bottom = '20%';
      config.grid.width = '80%';
      config.grid.height = '85%';
      config.grid.y = '5%';
      config.xAxis.axisLine={lineStyle:{color:'#979696'}};
      config.yAxis.axisLine={lineStyle:{color:'#979696'}};
      config.series[0].itemStyle.normal.label.formatter = function (a) {
        switch (a.dataIndex) {
          case 0: return "Wait Time";
          case 1: return "Politeness";
          case 2: return "Understand";
          case 3: return "Resolution";
        }
      };
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
