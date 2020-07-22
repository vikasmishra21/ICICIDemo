import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FilterService} from "../../shell/services/filter.service";
import {Chart} from "../../shell/models/chart";
import {Subject} from "rxjs";
import {NPS} from './tables/nps';
import {ChartTypes} from '../../shell/enums/chart.types';
import {Measure} from '../../shell/enums/measure';
import {TopBox} from './tables/top.box';
import {KPI} from './tables/kpi';
import {OtcResolution} from './tables/otc-resolution';
import {OtcNoCompletion} from './tables/otc-no-completion';
import {KpiImpact} from './tables/kpi-impact';
import {TAT} from './tables/tat';
import {NonOtcResolution} from './tables/non-otc-resolution';
import {Reasons} from './tables/reasons';
import {NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {FilterConfigService} from '../../service/filter-config.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe = new Subject();
  tat: Chart;
  topBox: Chart;
  topBoxTrend: Chart;
  kpis: Chart;
  kpiTrends: Array<Chart>;
  reasons: Chart;
  kpiImpact: Chart;
  npsKPI: Chart;
  npsTrend: Chart;
  otcResolution: Chart;
  nonOtcResolution: Chart;
  otcNoCompletion: Chart;
  onDataUpdate: Subject<any> = new Subject();
  kpiDiff = [];

  constructor(private filterService: FilterService, private router: Router, private fc: FilterConfigService) {
    this.kpiTrends = new Array<Chart>();
    this.npsKPI = new Chart({Type: ChartTypes.KPI, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.npsTrend = new Chart({Type: ChartTypes.Area, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.topBoxTrend = new Chart({Type: ChartTypes.Area, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.topBox = new Chart({Type: ChartTypes.KPI, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.kpis = new Chart({Type: ChartTypes.BarChart, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.reasons = new Chart({Type: ChartTypes.BarChart, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.kpiImpact = new Chart({Type: ChartTypes.Scatter, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.otcResolution = new Chart({Type: ChartTypes.Pie, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.nonOtcResolution = new Chart({Type: ChartTypes.Pie, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.otcNoCompletion = new Chart({Type: ChartTypes.Pie, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
    this.tat = new Chart({Type: ChartTypes.BarChart, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
      this.fc.isReRoute = true;
      if(val instanceof NavigationEnd){
        this.refresh();
      }
    });
    this.filterService.optionSelectionCallback$.subscribe(value => {
      this.refresh();
    });
  }

  refresh(){
    const otcVal = this.filterService.getSelectedChoices('v16');
    this.npsKPI = new NPS().getConfig();
    this.npsTrend = new NPS().getTrend();
    this.topBox = new TopBox().getConfig();
    this.topBoxTrend = new TopBox().getTrend();
    const kpi = new KPI();
    this.kpis = kpi.getConfig();
    this.kpiDiff = kpi.getKpiDiff();
    this.kpiImpact = new KpiImpact(otcVal[0] || 'x').getConfig();
    this.otcResolution = new OtcResolution().getConfig();
    this.nonOtcResolution = new NonOtcResolution().getConfig();
    this.otcNoCompletion = new OtcNoCompletion().getConfig();
    this.tat = new TAT().getConfig();
    this.reasons = new Reasons().getConfig();
    this.kpis.SideBreak.forEach((sb, index) => this.kpiTrends[index] = new KPI().getTrend(sb));
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    if(this.fc.isReRoute){
      this.router.navigate(['/home/overall'])
    }
  }


}
