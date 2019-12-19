import { Component } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';
import { ForecastService } from './services/forecast-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';
  constructor(private forecastService: ForecastService){

  }

  ngOnInit(){
    this.forecastService.weather$.subscribe(console.log)
  }
}
