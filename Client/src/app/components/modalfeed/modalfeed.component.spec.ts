import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalfeedComponent } from './modalfeed.component';

describe('ModalfeedComponent', () => {
  let component: ModalfeedComponent;
  let fixture: ComponentFixture<ModalfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalfeedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
