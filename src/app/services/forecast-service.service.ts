import { Injectable, isDevMode } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, Observable, pipe} from "rxjs";
import {map} from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Coords } from '../../models/coords.model';
import { Weather } from 'src/models/weather.model';
import { identifierModuleUrl } from '@angular/compiler';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  public weatherSubject : Subject<any> = new Subject<any>();
  public weather$ : Observable<any>;

  endpoint: string = "https://api.openweathermap.org/data/2.5/forecast"

  constructor(private http:HttpClient, private geolocationService: GeolocationService) { 
    this.weather$ = this.weatherSubject.asObservable().pipe(map(this.strucureData));
    this.geolocationService.coords$.subscribe(coords=>{
      this.get(coords);
    })
  }

  strucureData(data:any)
  {
    let minMaxDay = {};
    data.list.forEach(element=>{
      let date = new Date(element.dt * 1000);
      let hours = date.getHours();
      let month = date.getMonth()+1;
      let day = date.getDate();
      let key = `${month}-${day}`;

      let tempDay : Weather = minMaxDay[key] || {
        minMaxTemp:{}
      };

      if(!tempDay.cod || hours == 16)
      {
        let source= element.weather[0];
        tempDay = {...tempDay, ...source};
        tempDay.cod = source.id;
        tempDay.name = data.city.name;
      }

      if(!tempDay.minMaxTemp.min || (element.main.temp_min < tempDay.minMaxTemp.min))
      {
        tempDay.minMaxTemp.min  = element.main.temp_min;
      }
      if(!tempDay.minMaxTemp.max || (element.main.max > tempDay.minMaxTemp.max))
      {
        tempDay.minMaxTemp.max  = element.main.temp_max;
      }

      minMaxDay[key] = tempDay;

    });

    console.log(minMaxDay)
    

    return Object.values(minMaxDay);
  }

  get(coord: Coords){

    let args: string = `lat=${coord.lat}&lon=${coord.lon}&APPID=${environment.key}&units=metric`
    let url: string = `${this.endpoint}?${args}`;

    if(isDevMode())
    {
      url ='assets/forecast.json';
    }

    
    this.http.get(url)
    .subscribe(this.weatherSubject)
  }
}
