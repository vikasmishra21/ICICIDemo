import { Injectable } from '@angular/core';
import { ChartTypes } from '../enums/chart.types';
import { ChartProvider } from '../enums/chart.provider';
import { ChartProviderConfiguration } from '../interfaces/chart-provider-configuration';
import { ChartConfigurable } from '../interfaces/chart-configurable';
import { ZingChart } from './configurables/zing.chart';
import { ECharts } from './configurables/echarts';

@Injectable()
export class ChartConfiguration {

	static createChartConfig(type: ChartTypes, provider: ChartProvider,
		data: Array<any>, title: string): ChartProviderConfiguration {

		const configurationProvider: ChartConfigurable = this.getConfigProvider(provider);
		let configuration;
		switch (type) {
			case ChartTypes.KPI:
				configuration = configurationProvider.forKPI(title, data);
				break;
			case ChartTypes.Ring:
				configuration = configurationProvider.forRing(title, data);
				break;
			case ChartTypes.BarChart:
				configuration = configurationProvider.forBar(title, data);
				break;
			case ChartTypes.HorizontalBar:
				configuration = configurationProvider.forHBar(title, data);
				break;
			case ChartTypes.Line:
				configuration = configurationProvider.forLine(title, data);
				break;
			case ChartTypes.Pie:
				configuration = configurationProvider.forPie(title, data);
				break;
			case ChartTypes.Scatter:
				configuration = configurationProvider.forScatter(title, data);
				break;
			case ChartTypes.StackedBar:
				configuration = configurationProvider.forStackedBar(title, data);
				break;
			case ChartTypes.Stacked:
				configuration = configurationProvider.forStacked(title, data);
				break;
			case ChartTypes.MeanChart:
				configuration = configurationProvider.forMeanChart(title, data);
				break;
			case ChartTypes.VerticalBar:
				configuration = configurationProvider.forVBar(title, data);
				break;
			case ChartTypes.Area:
				configuration = configurationProvider.forArea(title, data);
				break;
			case ChartTypes.Bubble:
				//     // configuration = configurationProvider.forArea(title, data);
				//     // Will be handled later
				var myTempData = [
					// [x axis, y axis, amplitude, label on mouse hover]
					[28604, 77, 17096869, 'Australia'],
					[31163, 77.4, 27662440, 'Canada'],
					[1516, 68, 1154605773, 'China'],
					[13670, 74.7, 10582082, 'Cuba'],
					[28599, 75, 4986705, 'Finland']
				];

				configuration = {
					xAxis: {
					},
					yAxis: {
						scale: true
					},
					series: [
						{
							name: '1990',
							data: myTempData,
							type: 'scatter',
							symbolSize: function (myTempData) {
								return Math.sqrt(myTempData[2]) / 5e2;
							},
							label: {
								emphasis: {
									show: true,
									formatter: function (param) {
										return param.data[3];
									},
									position: 'top'
								}
							}
						}]
				};
				break;
		}
		return configuration;
	}

	private static getConfigProvider(provider: ChartProvider): ChartConfigurable {
		let configurationProvider: ChartConfigurable;
		switch (provider) {
			case ChartProvider.ZingChart:
				configurationProvider = new ZingChart();
				break;
			case ChartProvider.ECharts:
				configurationProvider = new ECharts();
				break;
			case ChartProvider.ChartJS:
				break;
		}
		return configurationProvider;
	}
}
