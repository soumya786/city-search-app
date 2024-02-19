import { Housinglocation } from './../housinglocation';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, HousingLocationComponent,CommonModule,MatInputModule],
  template: `
  <section>
  <form>

   <input type="text" placeholder="Filter by city" #filter>
    <button  class="primary" type="button" mat-raised-button
    color="primary"
    (click)="filterResults(filter.value)"
    >Search</button>
  </form>
</section>
<section class="results">
<app-housing-location *ngFor="let housingLocation of filteredLocationList"
[housingLocation]="housingLocation">

</app-housing-location>
</section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[]= [];
  // housingLocation: Housinglocation | undefined;
  housingService: HousingService
   = inject(HousingService);

  constructor(){
    this.housingService.getAllHousingLocations().then(
      (housingLocationList:  Housinglocation[]) =>{
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults(text: string){

    if(!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLocaleLowerCase().includes(text.toLowerCase())
    );

  }
}
