import { YzSubmitButtonDirective } from './yz-submit-button.directive';
import { MockElementRef } from '../../service/mock-element-ref';

describe('YzSubmitButtonDirective', () => {
  describe('YzSubmitButtonDirective', () => {
    let directive: YzSubmitButtonDirective;

    beforeEach(() => {
      const mockElementRef = new MockElementRef();
      const htmlButton = document.createElement('button');
      spyOnProperty(mockElementRef, 'nativeElement')
        .and.returnValue(htmlButton);
      directive = new YzSubmitButtonDirective(mockElementRef);
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('getButtonText', () => {
      const htmlButton = document.createElement('button');
      htmlButton.innerHTML = '<i class="hello"></i> 测试';

      directive.state.text = undefined;
      expect(directive.getButtonText(htmlButton)).toEqual('测试');
    });
  });
});
