import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherApiUrl = "https://api.open-meteo.com/v1/forecast";

  constructor(private http: HttpClient) { }

  getWeatherData(latitude: number, longitude: number): Observable<any> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: "temperature_2m,relative_humidity_2m",
      forecast_days: "1"
    };

    return this.http.get(this.weatherApiUrl, { params }).pipe(
      map((response: any) => {
        return this.processWeatherData(response);
      })
    );
  }

  private processWeatherData(response: any): any {
    const utcOffsetSeconds = response.utc_offset_seconds;
    const hourly = response.hourly;
    const timeArray = hourly.time;
    const temperatureArray = hourly.temperature_2m;
    const humidityArray = hourly.relative_humidity_2m;

    return {
      hourly: {
        time: timeArray.map((timestamp: number) => 
          new Date((timestamp + utcOffsetSeconds) * 1000)
        ),
        temperature2m: temperatureArray,
        relativeHumidity2m: humidityArray
      }
    };
  }
}