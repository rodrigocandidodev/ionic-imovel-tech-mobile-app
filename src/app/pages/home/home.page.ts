import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CalculateSellingPriceService } from 'src/app/services/calculate-selling-price.service';
import { CalculateSellingPrice } from 'src/app/interfaces/calculate-selling-price';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	private loading: any;
	public sellingPriceAttributes: CalculateSellingPrice = {};

	constructor(
	  	private authService: AuthService,
	  	private calculateSellingPriceService: CalculateSellingPriceService,
	    private loadingCtrl: LoadingController,
	    private toastCtrl: ToastController,

	) { }

	ngOnInit() {
	}

	async logout() {
		await this.presentLoading();

		try {
		  await this.authService.logout();
		} catch (error) {
		  console.error(error);
		} finally {
		  this.loading.dismiss();
		}
	}

	async calculateSellingPrice(){
		await this.presentLoading();

		try{
			await this.calculateSellingPriceService.calculateSellingPrice(this.sellingPriceAttributes);
		} catch(error){
			console.error(error);
		} finally{
			this.loading.dismiss();

		}
	}

	async presentLoading() {
		this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
		return this.loading.present();
	}

	async presentToast(message: string) {
		const toast = await this.toastCtrl.create({ message, duration: 2000 });
		toast.present();
	}

}
