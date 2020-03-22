import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	
	public userRegister: User = {};
	private loading: any;

	constructor(
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private authService: AuthService,
		private router: Router,
	) { }

	ngOnInit() {
	}

	goLogin(){
		return this.router.navigate(['login']);
	}

	async register(){
		await this.presentLoading();

		try{
			await this.authService.register(this.userRegister);
		} catch(error){
			this.presentToast(error.message);
		} finally{
			this.loading.dismiss();
			this.router.navigate(['home']);
		}
	}

	async presentLoading(){
		this.loading = await this.loadingCtrl.create({
			message: 'Por favor, aguarde!',
			duration: 2000
		});
		return this.loading.present();
	}

	async presentToast(message: string){
		const toast = await this.toastCtrl.create({	message, duration: 2000	});
		return toast.present();
	}
}
