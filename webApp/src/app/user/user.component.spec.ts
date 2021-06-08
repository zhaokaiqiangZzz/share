import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {getTestScheduler} from 'jasmine-marbles';
import {CommonModule} from '@angular/common';
import { CommonService } from '../../service/common.service';
import { RouterTestingModule } from '@angular/router/testing';
import { YzSubmitButtonTestModule } from '../../common/yz-submit-button/yz-submit-button-test.module';
import { PageModule } from '../../common/page/page.module';
import { SizeModule } from '../../common/size/size.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        CommonModule,
        RouterTestingModule,
        PageModule,
        SizeModule,
        FormsModule,
        ReactiveFormsModule,
        YzSubmitButtonTestModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService);
    spyOn(commonService, 'updateCurrentRouteState');
    fixture.detectChanges();
  });

  it('should create', () => {
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
