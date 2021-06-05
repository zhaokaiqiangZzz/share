import {HttpErrorResponse} from './Http-error-response';
import {ErrorMessage} from './error-message';

describe('HttpErrorResponse', () => {
  it('construct', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: new ErrorMessage({message: 'test'})
    });
    expect(httpErrorResponse.error?.message).toEqual('test');
  });
});
