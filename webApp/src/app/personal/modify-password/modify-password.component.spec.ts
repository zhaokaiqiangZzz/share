import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPasswordComponent } from './modify-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {YzSubmitButtonTestModule} from '../../../func/yz-submit-button/yz-submit-button-test.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiTestingModule} from '../../../api/api.testing.module';

describe('ModifyPasswordComponent', () => {
  let component: ModifyPasswordComponent;
  let fixture: ComponentFixture<ModifyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPasswordComponent ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule,
          YzSubmitButtonTestModule,
          ApiTestingModule,
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
