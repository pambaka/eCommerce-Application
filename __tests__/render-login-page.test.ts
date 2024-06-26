import { CLASS_NAMES } from '../src/const';
import renderLoginPage from '../src/pages/login/render/render-login';

describe('renderLoginPage', () => {
  const loginForm = renderLoginPage();
  document.body.append(loginForm);

  const button = document.body.querySelector(`.${CLASS_NAMES.loginButton}`);
  const email = document.querySelector(`.${CLASS_NAMES.loginLogin}`);
  const password = document.querySelector(`.${CLASS_NAMES.loginPassword}`);

  const keyUpEvent = new KeyboardEvent('keyup', {});

  it('should not enable login button if form validation fails', () => {
    expect(button).toBeInstanceOf(HTMLButtonElement);

    if (button instanceof HTMLButtonElement) {
      expect(button.disabled).toBe(true);

      expect(email).toBeInstanceOf(HTMLInputElement);
      expect(password).toBeInstanceOf(HTMLInputElement);

      if (email instanceof HTMLInputElement && password instanceof HTMLInputElement) {
        email.value = 't@t.tt'; // valid
        password.value = '12345678'; // invalid
        password.dispatchEvent(keyUpEvent);

        expect(button.disabled).toBe(true);
      }
    }
  });

  it('should enable login button after successful form validation', () => {
    expect(button).toBeInstanceOf(HTMLButtonElement);

    if (button instanceof HTMLButtonElement) {
      expect(button.disabled).toBe(true);

      if (email instanceof HTMLInputElement && password instanceof HTMLInputElement) {
        email.value = 't@t.tt'; // valid
        password.value = '123456Qq'; // valid
        password.dispatchEvent(keyUpEvent);

        expect(button.disabled).toBe(false);
      }
    }
  });
});
