import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuard } from "./helpers/auth.guard";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { Path } from "./models/path";
import { Role } from "./models/role";

const routes: Routes = [
  {
    path: Path.Home,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Path.Admin,
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: Path.Login,
    component: LoginComponent,
  },

  // otherwise redirect to home
  { path: "**", redirectTo: Path.Home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
