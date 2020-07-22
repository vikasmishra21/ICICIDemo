import {Injectable} from '@angular/core';
import {ChartConfigurable} from '../../interfaces/chart-configurable';
import {ChartProviderConfiguration} from '../../interfaces/chart-provider-configuration';

@Injectable()
export class ZingChart implements ChartConfigurable {

  forBar(title: string, data: Array<any>): ChartProviderConfiguration {
    return undefined;
  }

  forHBar(title: string, data: Array<any>): ChartProviderConfiguration {
    const config: any = {
      type: 'hbar',
      series: []
    };
    const series = {values: []};
    data.map(d => {
      series.values.push(d.value);
    });
    config.series.push(series);
    return config;
  }

  forKPI(title: string, data: Array<any>): ChartProviderConfiguration {
    return undefined;
  }

  forLine(title: string, data: Array<any>): ChartProviderConfiguration {
    return undefined;
  }

  forMeanChart(title: string, data: Array<any>): ChartProviderConfiguration {
    return undefined;
  }

  forPie(title: string, data: Array<any>): ChartProviderConfiguration {
    const config: any = {

      type: 'pie',
      plot: {
        tooltip: {
          text: '%t : %v'
        },
        borderWidth: 0,
        valueBox: {
          visible: true,
          'font-size': '12',
          'font-family': 'Arial',
          color: 'white',
          decimals: 0
        }
      },
      plotarea: {
        'margin-top': '0%',
        'margin-bottom': '15%'
      },
      legend: {
        layout: '2x3',
        x: '0%',
        y: '83%',
        // "layout":"1:1",
        'background-color': 'none',
        'toggle-action': 'remove',
        'border-width': 0,
        shadow: 0,
        'max-items': 6,
        height: '20%',
        overflow: 'scroll',
        item: {
          'font-color': '#7E7E7E',
          'max-chars': 17
        },
        tooltip: {
          text: '%t',
          'font-size': 10
        },
        scroll: {
          handle: {
            width: '8px'
          }
        }
      },
      series: []
    };

    data.forEach((d, i) => {
      config.series.push(
        {
          values: [d.value],
          ['background-color']: d.bgColor,
          text: d.name
        }
      );
    });
    return config;
  }

  forRing(title: string, data: Array<any>): ChartProviderConfiguration {
    const config: any = {
      type: 'ring',
      plot: {
        slice: 100
      },
      plotarea: {
        'margin-top': '0%',
        'margin-bottom': '0%',
        'margin-left': '0%',
        'margin-right': '0%',
      },
      scaleR: {
        refAngle: 270
      },
      series: []
    };
    data.forEach((d, i) => {
      config.series.push({
        values: [d]
      });
    });
    return config;
  }

  forScatter(title: string, data: Array<any>): ChartProviderConfiguration {
    return undefined;
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
    return undefined;
  }
}
