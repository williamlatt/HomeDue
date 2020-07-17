import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtenteService, newU } from 'src/app/services/utente.service';
import { Utente } from 'src/app/model/utente.model';
import { NavController, AlertController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { SIGNUP_ERROR_TITLE, SIGNUP_ERROR_SUB_TITLE} from '../../constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private signupFormModel: FormGroup;
  private signupTitle: string;
  private signupSubTitle: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder, private utenteService: UtenteService,
              private navController: NavController, private alertController: AlertController) { }

  ngOnInit() {
    this.signupFormModel = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      nome: ['', Validators.compose([
        Validators.required
      ])],
      cognome: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])]
    });
    this.initError();
  }
  signup() {
    const newu: newU = this.signupFormModel.value;
    this.utenteService.signup(newu).subscribe((newu: newU) => {
          this.signupFormModel.reset();
          this.navController.navigateRoot('/login2');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401 || err.status === 500) {
            console.error('login request error: ' + err.status);
            this.showSignupError();
          }
        });
  }
  initError() {
        this.signupTitle = SIGNUP_ERROR_TITLE;
        this.signupSubTitle = SIGNUP_ERROR_SUB_TITLE;
    }
    async showSignupError() {
      const alert = await this.alertController.create({
        header: this.signupTitle,
        message: this.signupSubTitle,
        buttons: ['OK']
      });
      await alert.present();
      this.signupFormModel.reset();
    }

}
