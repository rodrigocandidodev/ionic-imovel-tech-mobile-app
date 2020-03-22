import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  
  private loading: any;
	price: Array<any>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    ) {
    

    this.route.queryParams.subscribe(params => {
      let getNav = this.router.getCurrentNavigation();
      if (getNav.extras.state) {
        this.price = [
          {price: getNav.extras.state.priceToPass}
        ];
      }
    });
  }

  ngOnInit() {
  }

  goHome(){
  	return this.router.navigate(['home']);
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
  
  async presentLoading() {
		this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
		return this.loading.present();
	}

	async presentToast(message: string) {
		const toast = await this.toastCtrl.create({ message, duration: 2000 });
		toast.present();
	}

}
