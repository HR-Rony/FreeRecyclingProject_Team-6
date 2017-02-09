import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from '../itemsList/items.service';
import { AddItemService } from '../addItem/addItem.service';

@Component({
	selector: 'appAddItem',
	templateUrl: './addItem.component.html',
	styleUrls: ['./addItem.component.css']
})
export class AddItemComponent implements OnInit {
	addItemForm: FormGroup;
	constructor(private fb: FormBuilder, private itemService: ItemsService, private addItemService: AddItemService) {
		this.addItemForm = fb.group({
			name: ['', Validators.required],
			description: [''],
			details: [''],
			contact: fb.group({
				email: ['', [
					Validators.required,
					Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
				],
				phone: ['']
			}),
			state: ['', Validators.required],
			city: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.getStates();
	}

	states: [any];
	getStates() {
		this.addItemService.getStates(function (data: any) {
			this.states = data.json().states;
		}.bind(this))
	}

	cities: [any];
	populateCity(state:string) {
		this.addItemService.getCities(state, function (data: any) {
			this.cities = data.json().cities;
		}.bind(this))
	}

	submit() {
		let data:Object = this.addItemForm.value;	
		console.log(this.addItemForm.value);
		this.itemService.postForm(this.addItemForm.value);
	}
}
