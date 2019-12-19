import { Injectable, isDevMode } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject, Observable} from "rxjs";
import {map} from 'rxjs/Operators'
import { environment } from '../../environments/environment';
import { Coords } from '../../models/coords.model';
import { Weather } from 'src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject : Subject<any> = new Subject<any>();
  public weather$ : Observable<any>;

  endpoint: string = "https://api.openweathermap.org/data/2.5/weather"

  constructor(private http:HttpClient) { 
    this.weather$ = this.weatherSubject.asObservable().pipe(
     
      map((data: any)=>{
        let mainweather = data.weather[0];
        let weather: Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainweather
        }

        return weather;
      })
    );

    this.get({
      lat: 20.7775759,
      lon: -103.4221198
    });
  }

  get(coord: Coords){

    let args: string = `lat=${coord.lat}&lon=${coord.lon}&APPID=${environment.key}&units=metric`
    let url: string = `${this.endpoint}?${args}`;

    if(isDevMode())
    {
      url ='assets/weather.json';
    }

    
    this.http.get(url)
    .subscribe(this.weatherSubject)
  }
}