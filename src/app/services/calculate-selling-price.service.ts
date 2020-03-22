import { Injectable } from '@angular/core';
import { CalculateSellingPrice } from '../interfaces/calculate-selling-price';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalculateSellingPriceService {
	public sellingPrice: number;
	constructor(private router: Router,) { }

	goResults(price: string){
		//passing value to results page
		let navigationExtras: NavigationExtras={
			state:{
				priceToPass: price
			}
		};
		return this.router.navigate(['results'],navigationExtras);
	}

	calculateSellingPrice(cSP: CalculateSellingPrice){
  		
  		this.sellingPrice = (-1091.3705 * cSP.housesize) + (332385.7842 * cSP.bathroom) + (188527.9185 * cSP.pool) + (234399.3218 * cSP.garage) - 615448.3913;
  		this.goResults(this.sellingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  		
  	}

}
