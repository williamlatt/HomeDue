import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popoverimage',
  templateUrl: './popoverimage.component.html',
  styleUrls: ['./popoverimage.component.scss'],
})
export class PopoverimageComponent implements OnInit {
  private spesa = this.navParams.get('spesa');

  constructor(public navParams: NavParams) { }

  ngOnInit() {
  }

}
