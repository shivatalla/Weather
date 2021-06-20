import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from 'src/environments/environment';
import { APIEndPoints } from '../constants/apiendpointconstants';
import { Weather } from '../model/weather';

describe('WeatherService', () => {
  let dataService: WeatherService;
  let httpTestingController: HttpTestingController; 
  let baseUrl =  `${environment.url}`;
  let weather: Weather;
  let result:any;
  let appId: string = '3d8b309701a13f65b660fa2c64cdc517';
  let separator: string = ',';
  let apiurl:string;
  beforeEach(() => {    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    dataService = TestBed.inject(WeatherService);
    httpTestingController = TestBed.get(HttpTestingController);
    weather = {
      city:'London',
      country:'GK',
      temperature: 45,
      sunriseTime: 6,
      sunsetTime:7,
      seaLevel: 1020
    }         
  });
  beforeEach(inject(
    [WeatherService],
    (service: WeatherService) => {
      dataService = service;
    }
  ));
  it('should return data', () => {
    //let result: Weather[];
    dataService.getWeatherInfo('London', 'GK').subscribe(data => {
    let city = 'London';
    let country = 'GK';  
    apiurl = `${environment.url}${APIEndPoints.weather}${city}${separator}${country}${APIEndPoints.appId}${appId}`;
    result = data;
    expect(dataService).toBeTruthy();
  });
  const req = httpTestingController.expectOne({
    method: "GET",
    url: apiurl
  }); 
  req.flush([weather]); 
  expect(result[0]).toEqual(weather);
});

it("should throw error", () => {
  let error: any;
  dataService.getWeatherInfo('London', 'GK').subscribe( e => {
    error = e;
  });
 
  let req = httpTestingController.expectOne(apiurl);
  req.flush("Something went wrong", {
    status: 404,
    statusText: "Network error"
  }); 
  expect(error.indexOf("Error retrieving travellers data") >= 0).toBeTruthy();
});
});
