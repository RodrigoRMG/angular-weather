import { Injectable } from '@angular/core';
import { Coords } from 'src/models/coords.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public coordsSubject: Subject<Coords> = new Subject<Coords>()
  public coords$ : Observable<Coords> = this.coordsSubject.asObservable()
  public permission$ : Promise<string>
  public coordsPromise: Promise<Coords>;

  constructor() { 
    this.permission$ = (navigator as any).permissions.query({
      name:'geolocation'
    })
    .then(status => status.state)
  }

  requestGeolocation(){

    if(!this.coordsPromise)
    {
      this.coordsPromise = this.getGeolocation();
    }

    this.coordsPromise.then(coords=>{
      this.coordsSubject.next(coords)
    })
  }

  getGeolocation(): Promise<Coords>{
    return new Promise((resolve,reject)=>{
      if(!navigator || !('geolocation' in navigator)) return reject('Geolocation is not available');

      (navigator as any).geolocation.getCurrentPosition((position)=>{
        console.log("ok")
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      })

    })
  }
}
