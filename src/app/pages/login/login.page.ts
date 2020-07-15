import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UtenteService,Account } from 'src/app/services/utente.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Utente } from 'src/app/model/utente.model';
import { LOGIN_ERROR_TITLE,LOGIN_ERROR_SUB_TITLE} from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginTitle: string;
  private loginSubTitle: string;
  private loginFormModel: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private alertController: AlertController,
    private navController: NavController,
    private utenteService: UtenteService) { }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['admin', Validators.compose([
        Validators.required
      ])],
      password: ['123', Validators.compose([
        Validators.required
      ])]
    });
    this.initError();
  }
  onClickHome(){
    this.router.navigate(['home']);
  }
  onLogin() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((utente: Utente) => {
          this.loginFormModel.reset();
          this.navController.navigateForward('');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }
  initError()
  {
        this.loginTitle = LOGIN_ERROR_TITLE;
        this.loginSubTitle = LOGIN_ERROR_SUB_TITLE;
    }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
    this.loginFormModel.reset();
  }
  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('');
}


}
