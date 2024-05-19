export interface AuthorizationChangeEventDetail {
  isAuthorized: boolean;
}

const AUTHORIZATION_EVENT_NAME = 'authorizationChange';

export function dispatchAuthorizationChangeEvent(isAuthorized: boolean): void {
  const event = new CustomEvent<AuthorizationChangeEventDetail>(AUTHORIZATION_EVENT_NAME, {
    detail: { isAuthorized },
  });
  document.dispatchEvent(event);
}

export function subscribeToAuthorizationChangeEvent(
  listener: (event: CustomEvent<AuthorizationChangeEventDetail>) => void,
): void {
  document.addEventListener(AUTHORIZATION_EVENT_NAME, listener as EventListener);
}

export function unsubscribeFromAuthorizationChangeEvent(
  listener: (event: CustomEvent<AuthorizationChangeEventDetail>) => void,
): void {
  document.removeEventListener(AUTHORIZATION_EVENT_NAME, listener as EventListener);
}
