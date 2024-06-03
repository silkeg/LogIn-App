import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../lib/interactive/button/button.component';
import { TextfieldComponent } from '../../../lib/interactive/textfield/textfield.component';
import { ActivateService } from '../../../services/activate.service';
import { Router } from '@angular/router';
import { DropdownComponent } from '../../../lib/layout/dropdown/dropdown.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../../lib/layout/error-massage/error-message.component';

@Component({
  selector: 'app-nav-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TextfieldComponent,
    DropdownComponent,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './nav-login.component.html',
  styleUrl: './nav-login.component.scss',
})
export class NavLoginComponent {
  protected errorMessage = false;
  @Input() visible = false;

  constructor(
    private activateService: ActivateService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    const isLogin = this.activateService.login(form.value);

    if (isLogin) {
      form.reset();
      this.router.navigate(['user']);
    } else {
      this.errorMessage = true;
    }
  }
}
