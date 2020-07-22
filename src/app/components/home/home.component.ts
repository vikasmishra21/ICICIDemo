import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabs: any[] = [
    {
      title: 'Summary',
      route: '/home/overall',
    },
    {
      title: 'Comments',
      route: '/home/comments',
    }
  ];

  constructor(private sidebarService: NbSidebarService, private router: Router) {
  }

  toggle() {
    this.sidebarService.toggle();
  }

  ngOnInit() {
  }

}
