import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpostazioniComponent } from './impostazioni.component';

describe('ImpostazioniComponent', () => {
  let component: ImpostazioniComponent;
  let fixture: ComponentFixture<ImpostazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostazioniComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpostazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
