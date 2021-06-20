import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Weather, weatherDetails } from './../model/weather';
import { environment } from 'src/environments/environment';
import { APIEndPoints } from '../constants/apiendpointconstants';
@Injectable({
  providedIn: 'root'
})
export class WeatherService { 
  private appId: string = '3d8b309701a13f65b660fa2c64cdc517';
  separator: string = ',';

  constructor(private _http: HttpClient) { }

  //get weather info
  public getWeatherInfo(city:string, country:string): Observable<Weather>{
   let url = `${environment.url}${APIEndPoints.weather}${city}${this.separator}${country}${APIEndPoints.appId}${this.appId}`;
    return this._http.get<Weather>(url)
           .pipe(catchError(this.errorMsg));  }

  public getWeatherReport(city:string, country:string): Observable<weatherDetails>{
   let url = `${environment.url}${APIEndPoints.forecast}${city}${this.separator}${country}${APIEndPoints.appId}${this.appId}`;

    return this._http.get<weatherDetails>(url)
           .pipe(catchError(this.errorMsg));
           
  }

   //error handling
   errorMsg(err) {
    let msg = '';
    msg = 'Error:' + err.message;
    return throwError(msg);
  }
}
