import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherDetails(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3d8b309701a13f65b660fa2c64cdc517`;
    return this.http.get(url);
  }

  getCityDetails(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d8b309701a13f65b660fa2c64cdc517`;
    return this.http.get(url);
  }

}
