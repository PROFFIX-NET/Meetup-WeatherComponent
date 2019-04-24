import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Weather } from './weather.model';

/**
 * Modell der Wetter API
 */
interface WeatherApi {
  location: {
    name: string
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string,
      icon: string;
    }
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {

  private readonly weatherApiCurrentUrl = 'https://api.apixu.com/v1/current.json?key=a8e744ad55e14df3bda82412190904&lang=de&q=';

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(location: string): Observable<Weather> {
    return this.httpClient.get<WeatherApi>(this.weatherApiCurrentUrl + location).pipe(
      map<WeatherApi, Weather>(response => {
        return {
          city: response.location.name,
          currentTemperatur: response.current.temp_c,
          feelslikeTemperatur: response.current.feelslike_c,
          conditionText: response.current.condition.text,
          conditionImageUrl: 'https:' + response.current.condition.icon.replace('64x64', '128x128') // Icon höher aufgelöst und immer über SSL
        };
      })
    );
  }

}
