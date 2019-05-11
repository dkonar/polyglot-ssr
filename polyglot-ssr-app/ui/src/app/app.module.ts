import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThingComponent } from './thing.component';


@NgModule({
  declarations: [
    AppComponent,
    ThingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
