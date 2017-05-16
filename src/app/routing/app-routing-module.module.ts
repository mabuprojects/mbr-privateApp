import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SinginComponent} from "../pages/singin-page/singin.component";
import {AuthGuard} from "./auth-guard.service";


const appRoutes: Routes = [
  {path: 'singin', component: SinginComponent},
  { path: '',
    redirectTo: '/singin',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
