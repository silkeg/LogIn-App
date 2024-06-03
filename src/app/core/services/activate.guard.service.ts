import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivateService } from './activate.service';

@Injectable({ providedIn: 'root' })
export class ActivateGuard {
  constructor(
    private activateService: ActivateService,
    private router: Router
  ) {}
  async canActivate(): Promise<boolean> {
    const activate = await this.activateService.isActivate();
    if (activate) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
