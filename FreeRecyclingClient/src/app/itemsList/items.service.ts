import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { BaseUrl } from '../app.constants';
export type contacts = {
	email: string,
	phone?: string
}

export type items = {
	_id?: string,
	name: string,
	description?: string,
	details?: string,
	contact: contacts,
	category: string,
	state: string,
	city: string,
	coords: number[],
	img?: string,
	createdAt?: Date,
	updatedAt?: Date
}

@Injectable()
export class ItemsService {

  constructor(private http: Http, private router: Router) { }

  listItems:items[];
  currentItem: items;
  queried:boolean;
  defer:any = {
  	queried: false
  };

  ensureLoaded(query?:any) {

  	query = query || {};
	if(!query.skip) {
		query.skip = 0;
	}
	if(!query.limit) {
		query.limit = 10;
	}

	let params: URLSearchParams = new URLSearchParams();
	for(let key in query){
		params.set('query', JSON.stringify(query));
	}

  	if(!this.defer.queried) {
  		this.defer.queried=true;
  		this.defer.promise = new Promise((resolve, reject) => {
  			this.http.get(BaseUrl + '/items', {
  				'search': params
  			})
  			.subscribe(
	  			res => {
	  				this.listItems = res.json().data;
	  				resolve(res);
	  			},
	  			reject,
	  			() => this.defer.queried = false
			);
  		});
  	}

	return this.defer.promise;
  }

  postForm(data:any) {
	this.defer = new Promise((resolve, reject) => {
		this.http.post(BaseUrl + '/items', data).subscribe(
			
			res =>{ 
				this.router.navigate(['/items'],{queryParams:{id:res.json().data._id}})}
		);
	});
  }

  getById(id:string) {
  	let item;
  	if(this.listItems && this.listItems.length) {
  		console.log('here');
  		item = this.listItems.find(it => it._id === id);
  	}
  	if(!item) {
  		return new Promise((resolve, reject) => {
  			this.http.get(BaseUrl + '/items/' + id).subscribe(
  				res => {
  					this.currentItem = res.json().data
  					resolve(this.currentItem);
  				},
  				reject
			);
  		})
  	} else {
  		this.currentItem = item;
  		return Promise.resolve(item);
  	}
  }

deleteById(id:string) {
	console.log("======>"+id);
  		return new Promise((resolve, reject) => {
  			this.http.delete(BaseUrl + '/items/' + id).subscribe(
  				res => {
				console.log(res.json());
				this.router.navigate(['/items']);
				}
			);
  		})
  	
  }












}
