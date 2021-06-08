import {Directive} from '@angular/core';
import {YzSubmitButtonDirective} from './yz-submit-button.directive';

@Directive({
  selector: 'button[appYzSubmitButton]'
})
export class YzSubmitButtonTestDirective extends YzSubmitButtonDirective {
}
