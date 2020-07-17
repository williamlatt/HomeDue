import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopjoingroupComponent } from './popjoingroup.component';

describe('PopjoingroupComponent', () => {
  let component: PopjoingroupComponent;
  let fixture: ComponentFixture<PopjoingroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopjoingroupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopjoingroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
