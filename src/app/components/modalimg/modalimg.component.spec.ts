import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalimgComponent } from './modalimg.component';

describe('ModalimgComponent', () => {
  let component: ModalimgComponent;
  let fixture: ComponentFixture<ModalimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalimgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
