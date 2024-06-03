import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../lib/interactive/button/button.component';
import { TextfieldComponent } from '../../../lib/interactive/textfield/textfield.component';
import { ActivateService } from '../../../services/activate.service';
import { Router, RouterLink } from '@angular/router';
import { DropdownComponent } from '../../../lib/layout/dropdown/dropdown.component';

@Component({
  selector: 'app-nav-logout',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TextfieldComponent,
    DropdownComponent,
    RouterLink,
  ],
  templateUrl: './nav-logout.component.html',
  styleUrl: './nav-logout.component.scss',
})
export class NavLogoutComponent {
  constructor(
    private activateService: ActivateService,
    protected router: Router
  ) {}
  @Input() visible = false;
  onLogOut() {
    this.activateService.logout();
    this.router.navigate(['/']);
  }
}
