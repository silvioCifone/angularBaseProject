import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "./authentication.service";
import { Path } from "./models/path";
import { Role } from "./models/role";
import { User } from "./models/user";
import {Languages} from "./models/languages"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "toolstaffing-local-frontend";
  user: User;
  locale:string

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }
  

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  redirectToHome() {
    this.router.navigate([Path.Home]);
  }

  redirectToAdmin() {
    this.router.navigate([Path.Admin]);
  }

  logout() {
    this.authenticationService.logout();
  }

  setLanguage(){

    if(localStorage.getItem("language") != null){
      let lang = localStorage.getItem('language');
      this.translate.use(lang);

    }else{
      this.translate.use(Languages.ENG);
    }

  }

  ngOnInit(): void {
    this.setLanguage();
  }
}
