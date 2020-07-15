import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalimg',
  templateUrl: './modalimg.component.html',
  styleUrls: ['./modalimg.component.scss'],
})
export class ModalimgComponent implements OnInit {
  private spesa = this.navParams.get('spesa');
  constructor(public navParams: NavParams, public modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }
}
