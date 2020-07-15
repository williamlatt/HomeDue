import { Utente_spesa } from './../../model/utente_spesa.model';
import { Spesa } from './../../model/spesa.model';
import { SpesaService } from 'src/app/services/spesa.service';
import { GruppoService } from 'src/app/services/gruppo.service';
import { Utente_gruppoService } from '../../services/utente_gruppo.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Utente_gruppo } from 'src/app/model/utente_gruppo.model';
import { Gruppo } from 'src/app/model/gruppo.model';
import { Component, OnInit, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoService } from 'src/app/services/photo.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
@Component({
  selector: 'app-modalspesa',
  templateUrl: './modalspesa.component.html',
  styleUrls: ['./modalspesa.component.scss'],
})

export class ModalspesaComponent implements OnInit {

  data = {
    descrizione: '',
    pagatori: [],
    spese: [
      {
        importo: null,
        partecipanti: [
          {
            idi: '',
            idj: '',
            idParteciapante: 0,
          }
        ]
      }
    ]
  };
  public myForm: FormGroup;
  constructor(public modalController: ModalController, public alertController: AlertController,
              public utente_gruppoService: Utente_gruppoService, public gruppoService: GruppoService,
              private formBuilder: FormBuilder, private _renderer2: Renderer2, private toastCtrl: ToastController,
              private spesaService: SpesaService, private photoService: PhotoService,private camera: Camera) {
  }

  public selected = null;
  private gruppo$: Observable<Gruppo>;
  public g$: Gruppo;
  public ug2$;
  private ug$: Observable<Utente_gruppo[]>;
  @ViewChildren('nome') nomi: QueryList<ElementRef>;
  @ViewChildren('immagine') immagini: QueryList<ElementRef>;
  private spesef = [];
  private nomiA: any;
  private immaginiA: any;
  private lastX: string;
  private lastY: string;
  buttonActive = true;
  private regex2 = new RegExp('^[0-9+-.*()]*$');
  private dinamicadd = [];
  private sommaSpese = 0;
  private allPartecipanti;
  private pagatori;
  private add = false;
  private totale = 0;
  private dati;
  image;
  imageData;



  ngOnInit() {
    this.ug$ = this.utente_gruppoService.listaGruppoUtente();
    this.ug$.subscribe(m => this.ug2$ = m);
    this.gruppo$ = this.gruppoService.getGruppo();
    this.gruppo$.subscribe(m => this.g$ = m);
    this.myForm = this.formBuilder.group({
      descrizione: [null, [Validators.required]],
      pagatori: [null, [Validators.required]],
      spese: this.formBuilder.array([]),
    });
    this.setSpese();
  }

ngAfterViewInit() {
      // Testo chip

    this.nomi.changes.subscribe((e) => {
      if (this.dinamicadd.length === 0 && this.selected !== 'all' && this.add ) {
      this.nomi.forEach((element) => {
        if (element.nativeElement.id === this.lastY + '-' + this.lastX) {
          this.nomiA = element.nativeElement;
        }
      });
      if (this.nomi.length > 0) {
        this._renderer2.setProperty(this.nomiA, 'innerHTML', this.selected.nome.charAt(0)
          + this.selected.cognome.charAt(0));
      } else { }


    } else if (this.dinamicadd.length > 0 && this.selected !== 'all') {
      this.nomi.forEach((element) => {
        this.dinamicadd.forEach((element2) => {
          if (element.nativeElement.id === element2.id) {
            this.nomiA = element.nativeElement;
            if (this.nomi.length > 0 && this.nomiA !== null) {
              this._renderer2.setProperty(this.nomiA, 'innerHTML', element2.utente.nome.charAt(0)
              + element2.utente.cognome.charAt(0));
              this.nomiA = null;
          }
          }
          });
      });
    } else {

    }
    });
    // Immagini
    this.immagini.changes.subscribe((e) => {
      if (this.dinamicadd.length === 0 && this.selected !== 'all' && this.add ) {
      this.immagini.forEach((element) => {
        if (element.nativeElement.id === this.lastY + '-' + this.lastX) {
          this.immaginiA = element.nativeElement;
        }
      });
      if (this.immagini.length > 0) {
        this._renderer2.setProperty(this.immaginiA, 'src', this.selected.link);
      } else { }
    } else if (this.dinamicadd.length > 0 && this.selected !== 'all') {
      this.immagini.forEach((element) => {
        this.dinamicadd.forEach((element2) => {
          if (element.nativeElement.id === element2.id) {
            this.immaginiA = element.nativeElement;
            if (this.immagini.length > 0 && this.immaginiA !== null) {
              this._renderer2.setProperty(this.immaginiA, 'src', element2.utente.link);
              this.immaginiA = null;
          }
          }
          });
      });
      this.dinamicadd = [];
      this.selected = 'all';
    } else {

    }
      this.add = false;
    });

}

  setSpese() {
    const control =  this.myForm.controls.spese as FormArray;
    this.data.spese.forEach(x => {
      control.push(this.formBuilder.group({
        importo: x.importo,
        partecipanti: this.setPartecipanti(x)
      }));
    });
  }

  setPartecipanti(x) {
    const arr = new FormArray([]);
    x.partecipanti.forEach(y => {
      arr.push(this.formBuilder.group({
        idi: null,
        idj: null,
        idPartecipante: y.idPartecipante
      }));
    });
    return arr;
  }

  addNewSpesa() {
    this.setSpese();
  }

  addNewPartecipante(control, ix, jx) {
    this.add = true;
    if (this.selected === 'all') {
      let countdel = 0;
      this.nomi.forEach(delement => {
        if (delement.nativeElement.id.split('-')[1] === ix) {
        this.delete(control, delement.nativeElement.id.split('-')[0] - countdel);
        countdel++;
        }
    });
      jx = 1;
    }
    this.lastX = ix;
    this.lastY = jx + 1;
    let cont = false;
    if (this.selected !== 'all' && this.selected !== null ) {
      control.value.forEach(element => {
        if (element.idPartecipante !== null) {
        if (element.idPartecipante.id === this.selected.id && element.idi === ix) {
          cont = true;
        }
      }
      });
      if (!cont) {
        control.push(
          this.formBuilder.group({
            idi: ix,
            idj: jx,
            idPartecipante: [this.selected]
          }));
      }
    } else if (this.selected === 'all') {
      let count = 0;
      this.ug2$.forEach( element => {
        this.selected = element.utente;
        this.addNewPartecipante(control, ix, jx + count);
        this.dinamicadd.push( {id: (jx + count)  + '-' + ix, utente: this.selected});
        count ++;
      });
      this.lastY = jx + count;
    } else {
      this.alertError();
    }
  }
    delete(control, index) {
      control.removeAt(index);
    }
    deleteSpesa(index) {
      const control =  this.myForm.controls.spese as FormArray;
      control.removeAt(index);
    }


    onFormSubmit() {
      this.sommaSpese = 0;
      this.spesef = [];
      this.pagatori = [];
      this.allPartecipanti = [];
      let result = this.myForm.value;
      this.pagatori = result.pagatori;
      let counts = 0 ;
      let currentdate = new Date();
      const s: Spesa = new Spesa(); 
      s.id = null;
      s.descrizione = String (result.descrizione);
      s.gruppo = this.g$;
      s.importo = 0;
      s.link = null;
      s.dataPubblicazione = currentdate;
      s.immagine = this.imageData;
      result.spese.forEach(element => {
       this.spesef.push({id: counts, importo: element.importo, partecipanti: element.partecipanti });
       });
      counts++;
      this.spesef.forEach(element2 => {
        let parzialeSpese = element2.importo / (element2.partecipanti.length - 1);
        element2.partecipanti.forEach(element => {
          if (element.idi !== null) {
              if (!this.allPartecipanti.some(item => item.utente.id === element.idPartecipante.id)) {
                 this.allPartecipanti.push({utente: element.idPartecipante, importo: -(parzialeSpese), proprietario: false, spesa: s});
                } else {
                  this.allPartecipanti.some((item) => {
                      if ( item.utente.id === element.idPartecipante.id) {
                        item.importo += (-parzialeSpese);
                      }
                  });
                }
              }
        });
        this.sommaSpese += element2.importo;
      });
      s.importo = this.sommaSpese;
      this.ug2$.some(item => {
        this.pagatori.forEach((element) => {
        if (item.utente.id === (Number (element.split('-')[0]))) {
          if (!this.allPartecipanti.some(item2 => item.utente.id === item2.utente.id)) {
          this.allPartecipanti.push({utente: item.utente, importo: 0, proprietario: true, spesa: s});
          }
        }
      });
    });
      if (this.pagatori.length === 1) {
      this.allPartecipanti.forEach(element => {
        if (this.pagatori.some((item) => (Number (item.split('-')[0])) === element.utente.id)) {
            element.importo += this.sommaSpese;
            element.proprietario = true;
        }
      });
    }

      this.presentAlertPrompt();
   }
    setPartecipanteSingolo(x, chip, row) {
      row.el.childNodes.forEach(element => {
        if (element.nodeName !== '#comment') {
          this._renderer2.setProperty(element, 'color', '');
        }
      });
      this._renderer2.setProperty(chip, 'color', 'primary');
      this.selected = x;
    }
    inputValidator(x, valu) {
      if (!this.regex2.test(x.value)) {
        x.value = x.value.slice(0, x.value.length - 1);
      }
      if (x.value.slice(x.value.length, x.value.length - 1) !== '+') {
        valu.value = eval(x.value);
      }
    }
    setAllPartecipanti(chip, row) {
      row.el.childNodes.forEach(element => {
        if (element.nodeName !== '#comment') {
          this._renderer2.setProperty(element, 'color', '');
        }
      });
      this._renderer2.setProperty(chip, 'color', 'warning');
      this.selected = 'all';
}

  dismiss() {
    this.presentAlertPrompt();
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  
  async alertError() {
    const err = await this.alertController.create({
      header: 'Nessun utente selezionato!',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
        }],
    });
    await err.present();
  }

  async presentAlertPrompt() {

    if (this.pagatori.length > 1) {

    let myInputs = [];
    this.pagatori.forEach( element => {
      myInputs.push({
      name: element.split('-')[0],
      type: 'number',
      max:  this.sommaSpese,
      value: null,
      id: element.split('-')[0],
      placeholder: 'Importo pagato da ' + element.split('-')[1]});
    });
    const alert = await this.alertController.create({
      header: 'Ripartizione',
      subHeader: 'La somma delle spese è: ' + this.sommaSpese + '€',
      message: 'Come sono ripartite le spese?',
      inputs: myInputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          role: 'submit',
          handler: (data) => {
            this.totale = 0;
            Object.getOwnPropertyNames(data).forEach(element => {
                this.totale += Number (data[element]);
              }
            );
            if (this.totale === this.sommaSpese) {
              Object.getOwnPropertyNames(data).forEach(element => {
                this.allPartecipanti.some((item) => {
                  if (item.utente.id === Number (element)) {
                    item.importo += Number (data[element]);
                    item.proprietario = true;
                  }
                  });
                });
              this.allPartecipanti.some((item) => {
                  if (item.importo === 0 && item.proprietario === false) {
                    this.allPartecipanti = this.allPartecipanti.filter(function( obj ) {
                      return obj.utente.id !== item.utente.id;
                  });
                  }
                });
              var utenti_spese = [];
              this.allPartecipanti.forEach(element => {
                let us = new Utente_spesa();
                us.importo = element.importo;
                us.proprietario = element.proprietario;
                us.spesa = element.spesa;
                us.utente = element.utente;
                utenti_spese.push(us);
              });
              this.spesaService.addSpesa(utenti_spese).subscribe();
              this.modalController.dismiss({
                dismissed: true
              });
                } else {
              alert.dismiss();
              this.showErrorToast('La somma delle spese inserite supera il totale di: ' + this.sommaSpese);
            }
          }
          }
      ]
    });
    await alert.present();
    } else {
      console.log(this.allPartecipanti);
      let utenti_spese = [];
      this.allPartecipanti.forEach(element => {
        let us = new Utente_spesa();
        us.importo = element.importo;
        us.proprietario = element.proprietario;
        us.spesa = element.spesa;
        us.utente = element.utente;
        utenti_spese.push(us);
      });
      this.spesaService.addSpesa(utenti_spese).subscribe();
      this.modalController.dismiss({
        dismissed: true
      });
    }
  }

  async showErrorToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top',
      color: 'danger',
      });
    this.presentAlertPrompt();
    await toast.present();
  }

  public openCamera(input){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
   }
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = ''
      this.imageData = 'data:image/jpeg;base64,' + imageData;
      //console.log(base64Image);
    //this.imageData = imageData;
    //this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    this._renderer2.setProperty(input,'disabled','true');
    this._renderer2.setProperty(input,'color','success');
    //this.photoService.image = this.image;
    //this.photoService.imageData= this.imageData;
    }, (err) => {
       // Handle error
       this._renderer2.setProperty(input,'disabled','false');
       this._renderer2.setProperty(input,'color','');
       alert("error "+JSON.stringify(err))
  });

}
}
