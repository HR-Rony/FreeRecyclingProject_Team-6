import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../itemsList/items.service'; 

@Component({
  selector: 'app-eachItem',
  templateUrl: './eachItem.component.html',
  styleUrls: ['./eachItem.component.css']
})
export class SingleItemComponent implements OnInit {

  constructor(private itemsSrvc:ItemsService) { }

  ngOnInit() {
  }

}
