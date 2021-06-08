import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduateComponent } from './post-graduate.component';

describe('PostGraduateComponent', () => {
  let component: PostGraduateComponent;
  let fixture: ComponentFixture<PostGraduateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostGraduateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
