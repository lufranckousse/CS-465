import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
@Component({selector:'app-trip-card',standalone:true,imports:[CommonModule],templateUrl:'./trip-card.component.html',styleUrl:'./trip-card.component.css'})
export class TripCardComponent { @Input() trip!:Trip; @Output() deleted=new EventEmitter<string>(); constructor(private router:Router, private authenticationService:AuthenticationService){} isLoggedIn():boolean{return this.authenticationService.isLoggedIn();} editTrip(trip:Trip):void{localStorage.setItem('tripCode',trip.code);this.router.navigate(['edit-trip']);} }
