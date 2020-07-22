import {Injectable} from '@angular/core';
import {FilterService} from '../shell/services/filter.service';
import {FilterType} from '../shell/enums/filter-type';
import {FilterConfig} from '../shell/models/filterConfig';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterConfigService {
  isReRoute:boolean;
  private allFilters: Map<string, FilterConfig>;
  private onMenuToggleCallback: Subject<boolean> = new Subject<boolean>();
  onMenuToggleCallback$ = this.onMenuToggleCallback.asObservable();
  hideDivisionToggle: boolean;
  showTTALabel: boolean;

  constructor(private filterService: FilterService) {
    this.allFilters = new Map<string, FilterConfig>();
    this.initialize();
  }

  initialize() {
    this.allFilters.set('v1', {
      variable: 'v1', type: 1, isNested: false, visibility: true, default: ['5'],
      placeHolder: 'Month', actAs: FilterType.TimePeriod
    });
    this.allFilters.set('v8', {
      variable: 'v8', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Zone', actAs: FilterType.Filter
    });
    this.allFilters.set('v9', {
      variable: 'v9', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'City Cat', actAs: FilterType.Filter
    });
    this.allFilters.set('v12', {
      variable: 'v12', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Segement', actAs: FilterType.Filter
    });
    this.allFilters.set('v16', {
      variable: 'v16', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Cash/OTC/Non-OTC', actAs: FilterType.Filter
    });
    this.allFilters.set('v45', {
      variable: 'v45', type: 1, isNested: false, visibility: true, default: [],
      placeHolder: 'Account type', actAs: FilterType.Filter
    });

    this.allFilters.forEach(value => this.filterService.addFilterConfig(value));
  }

  initKpiFilters() {
    this.filterService.refreshFilters();
  }

  toggleFilterMenu(isShown: boolean) {
    this.onMenuToggleCallback.next(isShown);
  }


}
