import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';

import 'lodash';

declare var _: any;

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css'],
})
export class CityWeatherComponent implements OnInit {
  weatherForecastArray: Array<any> = [];
  city: string;

  constructor(private getWeatherUpdates: WeatherService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.city = params.city;
      this.weatherForecastArray = [];
      this.getWeatherUpdates.getWeatherDetails(this.city).subscribe(data => {
        const weatherForecastArray = data.list;
        weatherForecastArray.filter(forecast => {
          const time = forecast.dt_txt.slice(11, 16);
          if (time === '09:00') {
            const icon = _.get(forecast, 'weather[0].icon');
            const imgsrc = `https://openweathermap.org/img/wn/${icon}.png`;
            const seaLevel = _.get(forecast, 'main.sea_level');
            const temp = (_.get(forecast, 'main.temp') - 273.15).toFixed(2);
            this.weatherForecastArray.push({ temp, seaLevel, imgsrc });
          }
        });
      });
    });
  }

}
