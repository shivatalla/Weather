import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { weatherDetails } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  city:string;
  country:string;
  time:string = '9:00';
  data:any;
  temp:number;
  seaLevel:number;
  day: number;
  errMsg: boolean = false;
  reqData: Array<weatherDetails> = [];
  constructor( 
    private activatedRoute: ActivatedRoute,
    private WeatherService: WeatherService
    ) { }

  ngOnInit(): void {  
  //setting the query params city and country  
  this.city = this.activatedRoute.snapshot.queryParamMap.get('city')
  this.country = this.activatedRoute.snapshot.queryParamMap.get('country')  

  //Api call for wether details
  this.WeatherService.getWeatherReport(this.city, this.country).subscribe( res =>{
    this.data = res;    
    this.data = this.data.list;
    this.data.forEach((element, index) => {       
        var datetime = element.dt_txt.split(' ');        
        if(datetime[datetime.length-1] === '09:00:00'){
         this.day = datetime;
         let reqObj = {
         date: this.day[0],
         time: this.day[1],
         temp: element.main.temp,
         seaLevel: element.main.sea_level
         }
         this.reqData.push(reqObj);
        }      
    });    
  }, error => {     
      this.errMsg = true;
    })
  }
}
