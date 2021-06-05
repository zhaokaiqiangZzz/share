import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListsCheckboxComponent} from './lists-checkbox.component';
import {getTestScheduler} from 'jasmine-marbles';
import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {randomNumber, randomString} from '../utils';

@Component({
  template: `
    <app-lists-checkbox
      [getFn]="getFn"
      subject="测试"
      [formControl]="formControl"></app-lists-checkbox>`
})
class TestComponent {

  formControl = new FormControl();

  getFn(): Observable<Array<{ id: number, name: string }>> {
    const result = new Array<{ id: number, name: string }>();
    const total = 5 + randomNumber(10);
    for (let i = 0; i < total; i++) {
      result.push({id: i + 1, name: randomString('名称')});
    }
    return of(result);
  }
}


describe('ListsCheckboxComponent', () => {
  let component: ListsCheckboxComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsCheckboxComponent,
        TestComponent],
      imports: [
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(ListsCheckboxComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();

    testComponent.formControl.valueChanges.subscribe(value => console.log(value));
  });

  it('测试传入ID数组时是否能自动选中', () => {
    getTestScheduler().flush();
    testComponent.formControl.setValue([{id: 1}, {id: 2}]);
    fixture.autoDetectChanges();

    testComponent.formControl.valueChanges.subscribe(value => console.log(value));
  });
});
