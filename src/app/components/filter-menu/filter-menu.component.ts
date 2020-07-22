import {Component, OnInit} from '@angular/core';
import {FilterConfig} from "../../shell/models/filterConfig";
import {FilterConfigService} from "../../service/filter-config.service";
import {FilterService} from "../../shell/services/filter.service";

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {
  allFilters: Array<FilterConfig>;

  constructor(private fcService: FilterConfigService, private filterService: FilterService) {
    fcService.initialize();
    this.allFilters = new Array<FilterConfig>();
    this.filterService.getAllFilters().forEach(value => this.allFilters.push(value));
  }

  ngOnInit() {
  }

}
