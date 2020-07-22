import { Chart } from '../../../shell/models/chart';
import { ChartTypes } from '../../../shell/enums/chart.types';
import { Measure } from '../../../shell/enums/measure';
import { ChartProvider } from '../../../shell/enums/chart.provider';
import { TableOutput } from '../../../shell/interfaces/table-output';
import { ChartProviderConfiguration } from '../../../shell/interfaces/chart-provider-configuration';
import { RoundOffStrategy } from '../../../shell/enums/round.off.strategy';
import { TimePeriod } from '../../../shell/models/time.period';

export class TopBox {
	private readonly chart: Chart;

	constructor() {
		this.chart = new Chart({
			SideBreak: ['v25'],
			TopBreak: ['v1'],
			Type: ChartTypes.KPI,
			Measure: Measure.ColumnPercent
		}, 'OVERALL EXP.', ChartProvider.ECharts);
		this.chart.enableTimeComparison(RoundOffStrategy.BeforeBinding);
		this.chart.addShowOverall(true);
		this.chart.showTopBreakOptions(0, [TimePeriod.PreviousPeriod, TimePeriod.CurrentPeriod]);
		this.chart.addCalculationLogic(output => {
			return output
		}, RoundOffStrategy.AfterCalculation);

		this.chart.addChartConfigChange((output, config) => {
			config = {};
			config.Score = output[0].Score;
			config.Diff = output[0].Difference;
			return config;
		});
	}

	getConfig(): Chart {
		return this.chart
	}

	getTrend(): Chart {
		const trend = new Chart({
			SideBreak: ['v25'],
			TopBreak: ['v1'],
			Type: ChartTypes.Area,
			Measure: Measure.ColumnPercent
		}, 'TopBox-Trend', ChartProvider.ECharts);
		trend.hideSideBreakOptions(0, [1, 2, 3, 4]);
		trend.showSideBreakTotal(0, true);
		trend.addCalculationLogic(output => {
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

			config.series[0].areaStyle.normal = {
				color: 'rgba(0,149,217,0.15)'
			};
			config.series[0].itemStyle = {
				normal: {
					color:'rgba(111,111,111,1)',
					lineStyle: {
						width: 3,
						color:'rgba(0,149,217,1)'
					}
				}
			};

			config.grid.x = '0%';
			config.yAxis.max = Math.max(...config.series[0].data);
			return config;
		});
		return trend;
	}
}
