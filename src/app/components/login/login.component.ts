import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../shell/services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  login(username: string, pass: string) {
    this.loginService.accessDashboard(username, pass).subscribe(d => {
      this.router.navigate(['/home']);
    }, error1 => {
      // error code
      console.log('err');
    });
  }

  onKeypress(event, username: string) {
    this.login(username, event.target.value);
  }

}
