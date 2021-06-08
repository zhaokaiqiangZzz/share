import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighEntranceComponent } from './high-entrance.component';

describe('HighEntranceComponent', () => {
  let component: HighEntranceComponent;
  let fixture: ComponentFixture<HighEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighEntranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
