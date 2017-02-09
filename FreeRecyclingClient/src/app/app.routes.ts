import { RouterModule, Routes, Resolve } from '@angular/router';

import { ItemsListComponent } from './itemsList/itemsList.component';
import { ErrorComponent } from './error/error.component';
import { ItemListResolver } from './itemsList/items.resolver';
import { AddItemComponent } from './addItem/addItem.component';
import { SingleItemComponent } from './eachItem/eachItem.component';
import { SingleItemResolver } from './eachItem/eachItem.resolver';

const routes: Routes = [
	{
		path:'',
		redirectTo:'items',
		pathMatch: 'full'
	}, {
		path:'items',
		component: ItemsListComponent,
		resolve: {
			items: ItemListResolver
		}
	}, {
		path: 'items/add',
		component: AddItemComponent		
	},{
		path: 'items/:id',
		component: SingleItemComponent,
		resolve: {
			item: SingleItemResolver
		}
	}, {
		path: '404',
		component: ErrorComponent
	}, {
		path:'**',
		redirectTo:'404'
	}
];

export const RecycleBinRoutes = RouterModule.forRoot(routes);