import { ModalController, NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { newGruppo, GruppoService } from 'src/app/services/gruppo.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modalgruppo',
  templateUrl: './modalgruppo.component.html',
  styleUrls: ['./modalgruppo.component.scss'],
})

export class ModalgruppoComponent implements OnInit {
  @Input() groupFormModel: FormGroup;



  constructor(private formBuilder: FormBuilder, private modalController: ModalController,
              private gruppoService: GruppoService, private alertController: AlertController) { }

  ngOnInit() {
    this.groupFormModel = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required
      ])],
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  newGruppo() {
    const g: newGruppo = this.groupFormModel.value;
    this.gruppoService.nuovoGruppo(g).subscribe((g: newGruppo) => {
    this.showRegisterSuccess();
    },
    (err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 500) {
        this.showRegisterFail();
      }
    });
  }
  async showRegisterSuccess() {
    const alert = await this.alertController.create({
      header: 'Registrazione Gruppo',
      message: 'Avvenuta con successo, benvenuto nel tuo nuovo gruppo!',
      buttons: ['OK']
    });
    await alert.present();
  }

 async showRegisterFail() {
      const alert = await this.alertController.create({
        header: 'Registrazione Gruppo',
        message: 'La registrazione non è andata a buon fine riprova',
        buttons: ['OK']
      });
      await alert.present();
}
}
