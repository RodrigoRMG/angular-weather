import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../services/forecast-service.service';
import { shoUpStaggered } from '../animations/showUp.animation';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.sass'],
  animations: [shoUpStaggered]
})
export class ForecastComponent implements OnInit {

  constructor(public forecastService: ForecastService) { }

  ngOnInit() {
  }

}
