import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftControlComponent } from './left-control.component';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzIconModule} from 'ng-zorro-antd/icon';

describe('LeftControlComponent', () => {
  let component: LeftControlComponent;
  let fixture: ComponentFixture<LeftControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftControlComponent ],
      imports: [
        NzMenuModule,
        NzIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
