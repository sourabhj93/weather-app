import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from './weather.service';

import 'lodash';

declare var _: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  cityList: String[] = ['Mumbai', 'Pune', 'Raipur', 'Germany', 'Indore'];

  cityTempList: Object[] = [];

  constructor(private getWeatherUpdates: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.cityList.forEach((city: string) => {
      // fetching 5 cities weather data
      this.getWeatherUpdates.getCityDetails(city).subscribe(data => {
        const name = _.get(data, 'name');
        const temp = (_.get(data, 'main.temp') - 273.15).toFixed(2);
        const sunrise = this.sunriseTime(_.get(data, 'sys.sunrise'));
        const sunset = this.sunsetTime(_.get(data, 'sys.sunset'));
        this.cityTempList.push({ name, temp, sunrise, sunset });
      });
    });
  }

  sunriseTime(time) {
    var date = new Date(time*1000); // Milliseconds to date
    return date.getHours()+":"+date.getMinutes();
  }

  sunsetTime(time) {
    var date = new Date(time*1000); // Milliseconds to date
    return date.getHours()+":"+date.getMinutes();
  }

  cityWeatherDetail(name) {
      this.router.navigate(['/citydetails'], { queryParams: { city: name } });
  }

}
