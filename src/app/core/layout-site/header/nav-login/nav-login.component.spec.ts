import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavLoginComponent } from './nav-login.component';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../../../lib/interactive/button/button.component';
import { TextfieldComponent } from '../../../lib/interactive/textfield/textfield.component';
import { ActivateService } from '../../../services/activate.service';
import { Router } from '@angular/router';
import { DropdownComponent } from '../../../lib/layout/dropdown/dropdown.component';
import { ErrorMessageComponent } from '../../../lib/layout/error-massage/error-message.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('NavLoginComponent', () => {
  let component: NavLoginComponent;
  let fixture: ComponentFixture<NavLoginComponent>;
  let mockActivateService: jasmine.SpyObj<ActivateService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockActivateService = jasmine.createSpyObj('ActivateService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        NavLoginComponent,
        ButtonComponent,
        TextfieldComponent,
        DropdownComponent,
        ErrorMessageComponent,
        CommonModule,
        FormsModule,
      ],
      providers: [
        { provide: ActivateService, useValue: mockActivateService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message on failed login', () => {
    mockActivateService.login.and.returnValue(false);

    const form = {
      value: { username: 'wronguser', password: 'wrongpassword' },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    component.onSubmit(form);

    expect(component['errorMessage']).toBeTrue();
  });

  it('should navigate to user page on successful login', () => {
    mockActivateService.login.and.returnValue(true);

    const form = {
      value: { username: 'correctuser', password: 'correctpassword' },
      reset: jasmine.createSpy('reset'),
    } as unknown as NgForm;

    component.onSubmit(form);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['user']);
    expect(component['errorMessage']).toBeFalse();
  });

  it('should disable the button if form is invalid', waitForAsync(() => {
    component.visible = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const usernameInput: DebugElement = fixture.debugElement.query(
        By.css('input[name="username"]')
      );
      usernameInput.nativeElement.value = '';

      fixture.detectChanges();

      const buttonDebugElement: DebugElement = fixture.debugElement.query(
        By.css('app-button button')
      );
      expect(buttonDebugElement).toBeTruthy();

      const buttonNativeElement = buttonDebugElement.nativeElement;
      expect(buttonNativeElement.disabled).toBeTrue();
    });
  }));

  it('should enable the button if form is valid', waitForAsync(() => {
    component.visible = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const usernameInput: DebugElement = fixture.debugElement.query(
        By.css('input[name="username"]')
      );
      const passwordInput: DebugElement = fixture.debugElement.query(
        By.css('input[name="password"]')
      );
      usernameInput.nativeElement.value = 'abc';
      passwordInput.nativeElement.value = '123456';

      usernameInput.nativeElement.dispatchEvent(new Event('input'));
      passwordInput.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const buttonDebugElement: DebugElement = fixture.debugElement.query(
        By.css('app-button button')
      );
      expect(buttonDebugElement).toBeTruthy();

      const buttonNativeElement = buttonDebugElement.nativeElement;
      expect(buttonNativeElement.disabled).toBeFalse();
    });
  }));
});
