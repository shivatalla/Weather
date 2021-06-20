import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { Weather } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let getWeatherInfo: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it("getData() should call weather service and return weather info", () => {
    const response: Weather[] = [];  
    spyOn(WeatherService, getWeatherInfo).and.returnValue(of(response))  
    component.getData();  
    fixture.detectChanges();  
    expect(component.data).toEqual(response);
  });
});
