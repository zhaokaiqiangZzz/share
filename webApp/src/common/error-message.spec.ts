import {ErrorMessage} from './error-message';

describe('error message', () => {
  it('construct', () => {
    const errorMessage = new ErrorMessage();
    expect(errorMessage).toBeDefined();
  });
});
