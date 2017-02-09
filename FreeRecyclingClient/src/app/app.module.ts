import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { ItemsListComponent } from './itemsList/itemsList.component';
import { ItemsService } from './itemsList/items.service';
import { ErrorComponent } from './error/error.component';
import { AddItemService } from './addItem/addItem.service';
import { SearchService } from './Search/Search.service';

import { RecycleBinRoutes } from './app.routes';

import { ItemListResolver } from './itemsList/items.resolver';
import { AddItemComponent } from './addItem/addItem.component';
import { SingleItemComponent } from './eachItem/eachItem.component';
import { SingleItemResolver } from './eachItem/eachItem.resolver';
import { SearchComponent } from './Search/Search.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ErrorComponent,
    AddItemComponent,
    SingleItemComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecycleBinRoutes,
    ReactiveFormsModule,
    DatePickerModule
  ],
  providers: [
    ItemsService,
    ItemListResolver,
    SingleItemResolver,
    AddItemService,
    SearchService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
