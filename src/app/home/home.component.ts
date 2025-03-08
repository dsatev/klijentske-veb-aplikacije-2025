import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { FlightModel } from '../models/flight.model';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [ NgIf, NgFor,MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  flights: FlightModel[] | null = null
  error: string | null = null

  constructor(){
    FlightService.getFlights(0, 3)
    .then(rsp => this.flights = rsp.data.content)
    .catch((e: AxiosError)=> this.error = `${e.code}: ${e.message}`)
  }

  formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

  generateDestinationImage(dest: string){
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`
  }
}
