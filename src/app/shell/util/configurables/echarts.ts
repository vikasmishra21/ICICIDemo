import { Injectable } from '@angular/core';
import { ChartConfigurable } from '../../interfaces/chart-configurable';
import { ChartProviderConfiguration } from '../../interfaces/chart-provider-configuration';
import { isArray } from 'util';
declare var echarts: any;

@Injectable()
export class ECharts implements ChartConfigurable {

	forBar(title: string, data: Array<any>): ChartProviderConfiguration {
		// only get labels and heights as parameters

		var barLabels = [];
		var barHeights = [];
		var maxHeight;
		var dataShadow = [];

		for (var i = 0; i < data.length; i++) {
			barLabels.push(data[i].name);
			barHeights.push(data[i].value);
		}
		maxHeight = Math.max(...barHeights);

		for (var i = 0; i < barHeights.length; i++) {
			dataShadow.push(maxHeight);
		}
		// tooltip: {
		// 	// type: 'item',
		// 	show: true,
		// 	showContent: true,
		// 	alwaysShowContent: true,
		// 	triggerOn: 'mousemove',
		// 	trigger: 'axis',
		// 	axisPointer:
		// 	{
		// 		type: 'cross',
		// 		label: {
		// 			show: true,
		// 		}
		// 	}
		// }

		var option = {
			title: {
				text: title,
			},
			grid: {},
			tooltip: {
				confine: true,
				position: function (pos, params, dom, rect, size) {
					// tooltip will be fixed on the right if mouse hovering on the left,
					// and on the left if hovering on the right.
					//  _ Pos <array> -> [a,b] -> a is horizontal distance from left, b is vertical distance from top
					var obj = { top: pos[1] };
					console.log(isArray(pos));
					obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
					return obj;
				}
			},
			xAxis: {
				data: barLabels,
				axisLabel: {
					inside: true,
					textStyle: {
						color: '#fff'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				z: 10
			},
			yAxis: {
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				}
			},
			dataZoom: [
				{
					type: 'inside'
				}
			],
			series: [
				{ // For shadow
					type: 'bar',
					itemStyle: {
						normal: { color: 'rgba(0,0,0,0.2)' }
					},
					barGap: '-100%',
					barCategoryGap: '40%',
					data: dataShadow,
					animation: false
				},
				{
					type: 'bar',
					itemStyle: {
						normal: {
							color: 'rgba(194,53,49,1)'
						}
						// normal: {
						// 	color: new echarts.graphic.LinearGradient(
						// 		0, 0, 0, 1,
						// 		[
						// 			{ offset: 0, color: '#83bff6' },
						// 			{ offset: 0.5, color: '#188df0' },
						// 			{ offset: 1, color: '#188df0' }
						// 		]
						// 	)
						// },
						// emphasis: {
						// 	color: new echarts.graphic.LinearGradient(
						// 		0, 0, 0, 1,
						// 		[
						// 			{ offset: 0, color: '#2378f7' },
						// 			{ offset: 0.7, color: '#2378f7' },
						// 			{ offset: 1, color: '#83bff6' }
						// 		]
						// 	)
						// }
					},
					data: barHeights
				}
			]
		};

		return option;
	}

	forHBar(title: string, data: Array<any>): ChartProviderConfiguration {
		var option = {
			dataset: {
				source: [
					['value', 'name']
				]
			},
			title: {},
			padding: 0,
			grid: { containLabel: true },
			tooltip: {
				confine: true,
				position: function (pos, params, dom, rect, size) {
					// tooltip will be fixed on the right if mouse hovering on the left,
					// and on the left if hovering on the right.
					//  _ Pos <array> -> [a,b] -> a is horizontal distance from left, b is vertical distance from top
					var obj = { top: pos[1] };
					console.log(isArray(pos));
					obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
					return obj;
				}
			},
			xAxis: { name: 'score', splitLine: false },
			yAxis: { type: 'category' },
			series: [
				{
					type: 'bar',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					encode: {
						// Map the "amount" column to X axis.
						x: 'score',
						// Map the "product" column to Y axis
						y: 'product'
					}
				}
			]
		};

		for (var i = 0; i < data.length; i++) {
			const val = [data[i].value, data[i].name];
			option.dataset.source.push(val);
		}

		return option;
	}

	forKPI(title: string, data: Array<any>): ChartProviderConfiguration {
		return {
			title: {
				text: data[0].name
			}
		};
	}

	forLine(title: string, data: Array<any>): ChartProviderConfiguration {
		var option = {
			title: {
				text: title
			},
			grid: {
				containLabel: true,
				bottom: 500
			},
			legend: {
				data: []
			},
			xAxis: {
				type: 'category',
				data: []
			},
			yAxis: {
				type: 'value'
			},
			series: []
		};

		for (var i = 0; i < data.length; i++) {
			option.legend.data.push(data[i].text);
			option.xAxis.data.push(i + 1);
			var seriesObject = {
				name: data[i].text,
				type: 'line',
				data: data[i].values
			};
			option.series.push(seriesObject);
		}

		return option;
	}

	forMeanChart(title: string, data: Array<any>): ChartProviderConfiguration {
		return undefined;
	}

	forPie(title: string, data: Array<any>): ChartProviderConfiguration {

		var option = {
			grid: {
				containLabel: true
			},
			title: {
				left: 'center'
			},
			data: [{
				name: 'Drumstick'
			}],
			tooltip: {
				confine: true,
				trigger: 'item',
				formatter: "{b} : {c}<br/> {d}%"
			},
			series: [
				{
					type: 'pie',
					radius: '65%',
					center: ['50%', '50%'],
					selectedMode: 'multiple',
					data: [
						// { value: 1548, name: 'Apple' },
						// { value: 535, name: 'Potato' },
						// { value: 510, name: 'Banana' },
						// { value: 634, name: 'Chicken' },
						// { value: 735, name: 'Drumstick' }
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0,
							length: 5,
							length2: 5
						}
					}
				}
			]
		};

		data.forEach((d) => {
			// option.series[0].data.push({ value: d.value, name: d.name });
			option.series[0].data.push({
				name: d.name,
				value: d.value
			})
		});

		return option;
	}

	forRing(title: string, data: Array<any>): ChartProviderConfiguration {
		return undefined;
	}

	forScatter(title: string, data: Array<any>): ChartProviderConfiguration {
		var option = {
			grid: {
				containLabel: true
			},
			xAxis: {},
			yAxis: {},
			series: [{
				symbolSize: 30,
				// [[ x, y]]
				data: data,
				itemStyle: {
					normal: {
						// color: 'C23531',
						color: 'rgba(194,53,49,1)',
						borderWidth: 2,
						label: {
							show: true,
							position: 'left',
							// formatter: function (a) {
							// 	switch (a.dataIndex) {
							// 		case 0: return "Wait Time";
							// 		case 1: return "Politeness";
							// 		case 2: return "Understand";
							// 		case 3: return "Resolution";
							// 	}
							// 	// console.log(a);
							// 	// return a.dataIndex
							// }
						}
					}
				},
				type: 'scatter',
				tooltip: {
					trigger: 'item',
					// formatter: "{c}"
					formatter: function (c) {
						// console.log(JSON.stringify(c));
						return c.data[1] + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + c.data[0]
					}
				}
			}]
		};

		return option;
	}

	forStacked(title: string, data: Array<any>): ChartProviderConfiguration {
		return undefined;
	}

	forStackedBar(title: string, data: Array<any>): ChartProviderConfiguration {
		return undefined;
	}

	forVBar(title: string, data: Array<any>): ChartProviderConfiguration {
		return undefined;
	}

	forArea(title: string, data: Array<any>): ChartProviderConfiguration {
		var option = {
			tooltip: {
				confine: true,
				// type: 'item',
				show: true,
				showContent: true,
				alwaysShowContent: false,
				triggerOn: 'mousemove',
				trigger: 'axis',
				// axisPointer:
				// {
				// 	type: 'cross',
				// 	// label: {
				// 	// 	show: true,
				// 	// }
				// }
			},
			grid: {

			},
			xAxis: {
				//Labels ['a','b','c]
				data: [],
				type: 'category',
				boundaryGap: false
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				//Values [1,2,3]
				data: [],
				type: 'line',
				areaStyle: {},
				tooltip: {
					type: 'item',
					axisPointer: {
						type: 'cross'
					}
				}
			}]
		};

		for (var i = 0; i < data.length; i++) {
			option.series[0].data.push(data[i].value);
			option.xAxis.data.push('' || data[i].name);
		}

		return option;
	}

	// forBubble(title: string, data: Array<any>): ChartProviderConfiguration {
	// 	// Will be defined later
	// 	return undefined;
	// }

}
