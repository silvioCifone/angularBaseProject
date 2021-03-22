import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Path } from "./models/path";
import { Role } from "./models/role";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "toolstaffing-local-frontend";
  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
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
}
