import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    WeatherComponent
  ],
  entryComponents: [ // Components müssen zu EntryComponents hinzugefügt werden, damit sie von Angular ohne Referenz in einem Template geladen werden
    WeatherComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    WeatherService
  ]

})
export class AppModule {

  constructor(injector: Injector) {

    // Custom Element definieren und in CustomElementsRegistry anmelden
    const weatherElement = createCustomElement(WeatherComponent, { injector });
    window.customElements.define('app-weathercomponent', weatherElement);

  }

  // Bootstrapping manuell auslösen
  ngDoBootstrap() {

  }
}
