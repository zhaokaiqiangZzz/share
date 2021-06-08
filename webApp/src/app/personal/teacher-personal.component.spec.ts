import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TeacherPersonalComponent} from './teacher-personal.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('TeacherPersonalComponent', () => {
  let component: TeacherPersonalComponent;
  let fixture: ComponentFixture<TeacherPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherPersonalComponent],
      imports: [HttpClientModule,
        RouterTestingModule,
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
