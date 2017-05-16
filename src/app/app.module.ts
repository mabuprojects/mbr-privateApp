import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MaterializeModule} from "angular2-materialize/dist";
import {SinginComponent} from "./pages/singin-page/singin.component";
import {AppRoutingModule} from "./routing/app-routing-module.module";
import {MainContainerModule} from "./containers/main-container/main-container.module";
import {CoreModule} from "./core/core.module";
import {AuthenticationService} from "./core/authentication.service";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    SinginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    CoreModule,
    SharedModule,
    MainContainerModule,
    AppRoutingModule //Esto siempre lo último por el tema de las rutas más genérical al final

  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
