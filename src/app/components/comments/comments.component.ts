import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Chart} from '../../shell/models/chart';
import {Subject} from 'rxjs';
import {FilterService} from '../../shell/services/filter.service';
import {ChartTypes} from '../../shell/enums/chart.types';
import {Measure} from '../../shell/enums/measure';
import {Comments} from './tables/comments';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {CommentScatter} from './tables/comment-scatter';
import {NavigationEnd, Router} from '@angular/router';
import {FilterConfigService} from '../../service/filter-config.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe = new Subject();
  scatter: Chart;
  comments: Chart;
  onDataUpdate: Subject<any> = new Subject();
  private totalComments: any[];
  commentItems: any[];
  searchTerm$ = new Subject<string>();
  searchText: string;

  constructor(private filterService: FilterService, private router: Router, private fc: FilterConfigService) {
    this.scatter = new Chart({
      Type: ChartTypes.Scatter,
      TopBreak: [],
      SideBreak: [],
      Measure: Measure.ColumnPercent
    });
    this.comments = new Chart({Type: ChartTypes.Table, TopBreak: [], SideBreak: [], Measure: Measure.ColumnPercent});
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
      this.fc.isReRoute = true;
      if (val instanceof NavigationEnd) {
        this.refresh();
      }
    });
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged())
      .subscribe((res: string) => {
        this.searchComments(res);
      });
    this.filterService.optionSelectionCallback$.subscribe(value => {
      this.refresh();
    });
  }

  refresh() {
    this.scatter = new CommentScatter().getConfig();
    this.comments = new Comments().getConfig();
    this.comments.addTableDataReady((output, dataTable) => {
      this.totalComments = dataTable.rows.get('');
      this.searchComments('');
    });
    setTimeout(() => {
      this.onDataUpdate.next();
    });
  }

  searchComments(searchString: string) {
    this.commentItems = this.totalComments.filter((value: string) => value.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    if(this.fc.isReRoute){
      this.router.navigate(['/home/comments'])
    }
  }
}
