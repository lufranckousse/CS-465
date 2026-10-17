import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
@Component({selector:'app-trip-listing',standalone:true,imports:[CommonModule,TripCardComponent],templateUrl:'./trip-listing.component.html',styleUrl:'./trip-listing.component.css'})
export class TripListingComponent implements OnInit {
  trips:Trip[]=[]; message='';
  constructor(private tripDataService:TripDataService, private router:Router, private authenticationService:AuthenticationService) {}
  ngOnInit():void { this.loadTrips(); }
  loadTrips():void { this.tripDataService.getTrips().subscribe({next:v=>{this.trips=v;this.message=`There are ${v.length} trips available.`;},error:e=>this.message=`Unable to retrieve trips: ${e.message}`}); }
  isLoggedIn():boolean { return this.authenticationService.isLoggedIn(); }
  addTrip():void { this.router.navigate(['add-trip']); }
  deleteTrip(code:string):void { if(confirm(`Delete trip ${code}?`)) this.tripDataService.deleteTrip(code).subscribe(()=>this.loadTrips()); }
}
