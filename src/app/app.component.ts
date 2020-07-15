import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtenteService } from './services/utente.service';
import { BehaviorSubject } from 'rxjs';
import { Utente } from './model/utente.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private utente$: BehaviorSubject<Utente>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private utenteService: UtenteService
  ) {
    this.initializeApp();
  }
  ngOnInit(): void {
    this.utente$ = this.utenteService.getUtente();
    this.navController.navigateRoot('');
  }
  openPage(url: string) {
    this.navController.navigateForward(url);
}

  logout() {
    this.utenteService.logout();
    this.navController.navigateRoot('login');
}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.navController.navigateRoot('');
    });
  }
}
