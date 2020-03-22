import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	
	public userLogin: User = {};
	private loading: any;
	
	constructor(
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private authService: AuthService,
	    private router: Router,
	) { }

	ngOnInit() {
	}

	goRegister(){
		return this.router.navigate(['register']);
	}

	async login(){
		await this.presentLoading();

		try{
			await this.authService.login(this.userLogin);
		} catch(error){
			this.presentToast(error.message);
		} finally{
			this.loading.dismiss();
		}
	}

	async presentLoading(){
		this.loading = await this.loadingCtrl.create({
			message: 'Por favor, aguarde!',
			duration: 2000
		});
		return this.loading.present();
	}

	async presentToast(message: string) {
	    const toast = await this.toastCtrl.create({ message, duration: 2000 });
	    toast.present();
	  }
}
