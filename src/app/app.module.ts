import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShellModule} from "./shell/shell.module";
import {ProjectConfig} from "./shell/interfaces/project-config";
import {AppRoutingModule} from "./app.routes";
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbListModule,
  NbSidebarModule, NbRouteTabsetModule, NbIconModule
} from '@nebular/theme';
import { HomeComponent } from './components/home/home.component';
import { OverallComponent } from './components/overall/overall.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { CommentsComponent } from './components/comments/comments.component';
import {FormsModule} from '@angular/forms';

const projectConfig: ProjectConfig = {
  ProjectID: 'b722e21d-7a13-b9ad-3097-99a2cca7f929',
  ProjectName: 'ICICI',
  DashboardName: 'ICICI',
  DashboardID: 'd8852816-337f-f7f4-ca40-a4aa86f28194',
  Subscription: '145',
  HostPath: 'https://beta-v3-live-webrole.rebuscode.com/',
  version: 'v3'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OverallComponent,
    FilterMenuComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShellModule.forRoot(projectConfig),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'corporate'}),
    NbLayoutModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbInputModule,
    NbListModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbSidebarModule,
    NbIconModule,
    NbEvaIconsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
