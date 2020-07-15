import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CavansComponent } from './cavans.component';

describe('CavansComponent', () => {
  let component: CavansComponent;
  let fixture: ComponentFixture<CavansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavansComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CavansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
