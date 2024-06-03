import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ActivateService } from '../../../services/activate.service';
import { Subscription } from 'rxjs';
import { NavLoginComponent } from '../nav-login/nav-login.component';
import { IconUserComponent } from '../../../lib/icons/user/user.component';
import { IconBasketComponent } from '../../../lib/icons/basket/basket.component';
import { ButtonComponent } from '../../../lib/interactive/button/button.component';
import { NavLinkContentComponent } from './nav-link-content/nav-link-content.component';
import { NavLogoutComponent } from '../nav-logout/nav-logout.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NavLoginComponent,
    NavLogoutComponent,
    IconUserComponent,
    IconBasketComponent,
    ButtonComponent,
    NavLinkContentComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
  protected isDropdownOpen = false;
  protected logIn = false;
  private routerSubscription: Subscription | undefined;

  constructor(
    private activateService: ActivateService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.logIn = await this.activateService.isActivate();

    this.routerSubscription = this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
        this.logIn = await this.activateService.isActivate();
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isDropdownOpen) return;

    const targetElement = event.target as HTMLElement;
    const dropdownElements = document.querySelectorAll('.bwr-dropdown');

    const clickedInside = Array.from(dropdownElements).some((element) =>
      element.contains(targetElement)
    );
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }
}
