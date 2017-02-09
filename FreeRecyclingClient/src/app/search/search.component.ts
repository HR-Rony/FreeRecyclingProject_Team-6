import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../itemsList/items.service';
import { SearchService } from '../Search/Search.service';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  
  filter = {
   	state: '',  	
  	city: ''
  }
  location:any[];
  constructor(private itemSrvc: ItemsService,private advanceFormSrvc:SearchService) { }

  ngOnInit() {
	  		this.getStates();
  }

  states: [any];
	getStates() {
		this.advanceFormSrvc.getStates(function (data: any) {
			this.states = data.json().states;
		}.bind(this))
	}

cities: [any];
	populateCity(state:string) {
		this.advanceFormSrvc.getCities(state, function (data: any) {
			this.cities = data.json().cities;
		}.bind(this))
	}
  filterData() {
  	type createdAt = {
  		$gte?: Date,
  		$lte?: Date
  	}
  	type queryType = {  		
  		city?: string,
  		state?: string	
  	};
  	let query:queryType = {};

  	if(this.filter.state) query.state = this.filter.state;
  	if(this.filter.city) query.city = this.filter.city;

  	if(this.location && this.location.length) {
  		query["coords.coordinates"] ={
  			"$geoWithin": {
  				"$centerSphere":[ this.location, 1000000000 ]
  			}
  		}
  	}

  	this.itemSrvc.ensureLoaded(query);
  }
}
