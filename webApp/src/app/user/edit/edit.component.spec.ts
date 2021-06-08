import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {By} from '@angular/platform-browser';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let router: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ApiTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    router.paramsSubject.next({id: '123'});
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('V层确认按钮', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    console.log(button);
    button.click();
  });

  afterEach((done) => {
    fixture.whenStable().then(() => done());
    fixture.autoDetectChanges();
  });
});
