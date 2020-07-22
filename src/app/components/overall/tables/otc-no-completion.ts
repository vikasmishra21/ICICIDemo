import {Chart} from '../../../shell/models/chart';
import {ChartTypes} from '../../../shell/enums/chart.types';
import {Measure} from '../../../shell/enums/measure';
import {ChartProvider} from '../../../shell/enums/chart.provider';
import {TableOutput} from '../../../shell/interfaces/table-output';
import {ChartProviderConfiguration} from '../../../shell/interfaces/chart-provider-configuration';
import {RoundOffStrategy} from '../../../shell/enums/round.off.strategy';
import {TimePeriod} from '../../../shell/models/time.period';

export class OtcNoCompletion {
  private readonly chart: Chart;

  constructor() {
    this.chart = new Chart({
      SideBreak: ['v34'],
      TopBreak: ['v1'],
      Type: ChartTypes.Pie,
      Measure: Measure.ColumnPercent
    }, 'No Completion', ChartProvider.ECharts);
    this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
    this.chart.showTopBreakOptions(0, [TimePeriod.CurrentPeriod]);
    this.chart.hideSideBreakOptions(0, [1, 2]);
    this.chart.combineSideBreakOptions('v34', [1], 'No');
    this.chart.combineSideBreakOptions('v34', [2], 'Yes');
    this.chart.addCalculationLogic(output => {
      return output
    }, RoundOffStrategy.AfterCalculation);

    this.chart.addChartConfigChange((output, config) => {
      config.height = '300px';
      config.width = '100%';
      config.title.text = "Completion TIme(%)";
      config.title.textStyle={fontWeight:'normal',fontFamily:'Muli',fontSize:16,color:'#0095d9'};
      config.title.x = "center";
      config.title.padding=5;
      config.title.y = '2%';
      config.grid.y = '10%';
      config.series[0].itemStyle.normal = {
        color: function (a) {
         switch(a.dataIndex){
          case 0: return 'rgba(77,181,228,1)';
          case 1: return 'rgba(0,119,174,1)';
          case 2: return 'rgba(0,149,217,1)';   
          case 3: return 'rgba(171,212,247,1)';
          case 4: return 'rgba(200,150,100,1)';
          case 5: return 'rgba(50,150,50,1)';
          case 6: return 'rgba(200,150,200,1)';
          case 7: return 'rgba(100,0,200,1)';
          case 8: return 'rgba(255,150,0,1)';
         }
        }
       };
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
