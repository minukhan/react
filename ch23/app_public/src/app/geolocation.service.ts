import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public getPosition(cbsuccess:any,cbError:any,cbNoGeo:any): void{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(cbsuccess,cbError);
    }else{
      cbNoGeo();
    }
  }
}
