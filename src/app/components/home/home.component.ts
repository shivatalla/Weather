import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/model/weather';
import { WeatherService } from './../../services/weather.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  public data: any = [];
  public city: string;
  public country: string;
  public temparature: number;
  public sunrise: number;
  public sunset: number;
  public resData: any = [];
  errMsg: boolean = false;
  public inputData = [
    { city: 'London', country: 'uk' },
    { city: 'Istanbul', country: 'Turkey' },
    { city: 'Moscow', country: 'Russia' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Rome', country: 'Italy' }
  ];
  currentDate = new Date();
  constructor(
    private report: WeatherService,
    private _http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {   
     //Fetching the data for each city on load
    this.getData();
  }

  getData(){
     //Fetching the data for each city
     this.inputData.forEach(ele => {
      this.report.getWeatherInfo(ele.city, ele.country).subscribe(res => {
        this.data = res;
        let weatherData = {
          city: this.data.name,
          country: this.data.sys.country,
          temparature: this.data.main.temp,
          sunrise: this.data.sys.sunrise,
          sunset: this.data.sys.sunset,
        }
        this.resData.push(weatherData);   
      }, error => {     
        this.errMsg = true;
      })
    })  
  }
  //Navigating to details page with city and country query params
  details(city, country){
      this.route.navigate(['/details'], {queryParams:{city: city, country: country}});
  }

}
