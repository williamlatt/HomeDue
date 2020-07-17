import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpesaPage } from './spesa.page';

describe('SpesaPage', () => {
  let component: SpesaPage;
  let fixture: ComponentFixture<SpesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
