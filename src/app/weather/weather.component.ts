import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Weather } from './weather.model';
import { WeatherService } from './weather.service';
import { trigger, style, state, transition, animate, animation } from '@angular/animations';

// Animationen
const fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('300ms')
]);
const fadeOutAnimation = animation([
  style({ opacity: 1 }),
  animate('300ms')
]);

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [
    trigger('loadingVisible', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0, display: 'none' })),
      transition('true => false', [
        animate(300, style({ opacity: 0 }))
      ])
    ]),
    trigger('contentVisible', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', [
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class WeatherComponent implements OnInit {

  @Input() city = 'Wangs';

  @Output() switchTemperatur = new EventEmitter<'current' | 'feelslike'>();

  currentWeather: Weather;
  error: string;
  loading = true;
  showTempFeelslike = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getCurrentWeather(this.city).subscribe(
      currentWeather => {
        this.currentWeather = currentWeather;
        this.loading = false;
      },
      error => {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = error;
        }
        console.error(error);
        this.loading = false;
      }
    );
  }

  toggleTemperatur(event: MouseEvent): void {
    event.preventDefault();
    this.showTempFeelslike = !this.showTempFeelslike;
    this.switchTemperatur.emit((this.showTempFeelslike) ? 'feelslike' : 'current');
  }

}
