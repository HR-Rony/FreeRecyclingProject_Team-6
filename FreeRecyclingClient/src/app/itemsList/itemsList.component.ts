import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from './items.service';
@Component({
  selector: 'app-items-list',
  templateUrl: './itemsList.component.html',
  styleUrls: ['./itemsList.component.css']
})
export class ItemsListComponent implements OnInit {
  users: any[];
  constructor(private itemSrvc: ItemsService) { }

  ngOnInit() {
  }



  delete(id:string) {
	console.log("=====>"+id);		
		this.itemSrvc.deleteById(id);
	}
}

