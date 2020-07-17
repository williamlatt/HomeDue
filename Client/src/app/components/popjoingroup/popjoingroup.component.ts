import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Gruppo } from './../../model/gruppo.model';
import { AlertController, PopoverController, NavController } from '@ionic/angular';
import { GruppoService } from 'src/app/services/gruppo.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-popjoingroup',
  templateUrl: './popjoingroup.component.html',
  styleUrls: ['./popjoingroup.component.scss'],
})
export class PopjoingroupComponent implements OnInit {
@ViewChild("buonasera") p;
data;
  constructor(public gruppoService: GruppoService, public alertController: AlertController, public popoverController: PopoverController,
              public navController: NavController) { }

  ngOnInit() {}

  joinGroup() {
    this.popoverController.dismiss();
    this.gruppoService.joinGroup(this.p.value).subscribe((data) => {
     this.data = data;
     if (data === 'Errore') {
        this.showRegisterFail();
      } else if (data === 'ErroreGiaDentro') {
        this.showRegisterFail2();
      } else {
        this.showRegisterSuccess();
      }
   });
  }

  async showRegisterSuccess() {
      const alert = await this.alertController.create({
        header: 'Partecipazione Gruppo',
        message: 'Avvenuta con successo, benvenuto nel tuo nuovo gruppo!',
        buttons: [{
          text: 'Okay',
          handler: () => {
            location.reload();
          }
        }]
      });
      await alert.present();
    }
  async showRegisterFail() {
        const alert = await this.alertController.create({
          header: 'Partecipazione Gruppo',
          message: 'Il codice da te inserito non appartiene a nessun gruppo!',
          buttons: ['OK']
        });
        await alert.present();
  }
  async showRegisterFail2() {
    const alert = await this.alertController.create({
      header: 'Partecipazione Gruppo',
      message: 'Già fai parte di questo gruppo!',
      buttons: ['OK']
    });
    await alert.present();
}
}
