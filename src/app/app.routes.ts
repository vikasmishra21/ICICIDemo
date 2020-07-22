import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {OverallComponent} from "./components/overall/overall.component";
import {CommentsComponent} from './components/comments/comments.component';

const childRoutes: Routes = [
  {path: '', redirectTo: 'overall', pathMatch: 'full'},
  {path: 'overall', component: OverallComponent, data: {title: 'Overall'}},
  {path: 'comments', component: CommentsComponent, data: {title: 'Comments'}},
  {path: '**', redirectTo : 'overall'},
];

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'ICICI'}},
  {path: 'home', component: HomeComponent, children: childRoutes},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
