import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface loginData {
  username: string;
  password: string;
}

const validUserData = { username: 'test', password: '123456' };

@Injectable({ providedIn: 'root' })
export class ActivateService {
  private loggedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private isLoggedIn = false;

  async isActivate(): Promise<boolean> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.loggedSubject.value), 300)
    );
  }

  getActivationStatus(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }

  login(value: loginData) {
    this.isLoggedIn =
      validUserData.username === value.username &&
      validUserData.password === value.password;
    this.loggedSubject.next(this.isLoggedIn);
    return this.isLoggedIn;
  }

  logout() {
    this.loggedSubject.next(false);
  }
}
