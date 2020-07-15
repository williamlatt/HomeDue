import { SpesaService } from 'src/app/services/spesa.service';
import { UtenteService } from './../../services/utente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-popoversaldo',
  templateUrl: './popoversaldo.component.html',
  styleUrls: ['./popoversaldo.component.scss'],
})
export class PopoversaldoComponent implements OnInit {
  private io$ = this.utenteService.getUtente();
  private utenti = this.navParams.get('utenti');
  private idGruppo = this.navParams.get('id_gruppo');
  private addSaldo;
  public myForm: FormGroup;
  @ViewChild("utente", {static: false} ) utente;
  @ViewChild("saldo",  {static: false}) saldo;
 

  constructor(public navParams: NavParams, public popoverController: PopoverController, public utenteService: UtenteService,
              private formBuilder: FormBuilder, public spesaService: SpesaService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      beneficiario: [null, [Validators.required]],
      pagatore: this.utenteService.getUtente().getValue().id,
      importo: [null, [Validators.required, Validators.min(1)]],
    });
  }
  sendSaldo(){
    var valori = this.myForm.value;
    this.spesaService.addSaldo(valori).subscribe();
    this.popoverController.dismiss();
  }
}
