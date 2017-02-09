import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ItemsService } from '../itemsList/items.service';

@Injectable()
export class SingleItemResolver implements Resolve<any> {
	constructor(private itemSrvc : ItemsService) {
	}
	resolve(route: ActivatedRouteSnapshot):Observable<any> | Promise<any> {
		return this.itemSrvc.getById(route.params['id']);
	}
}