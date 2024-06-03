import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavLogoutComponent } from './nav-logout.component';
import { ActivateService } from '../../../services/activate.service';
import { Router, provideRouter } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../../lib/layout/dropdown/dropdown.component';
import { ButtonComponent } from '../../../lib/interactive/button/button.component';
import { TextfieldComponent } from '../../../lib/interactive/textfield/textfield.component';

describe('NavLogoutComponent', () => {
  let component: NavLogoutComponent;
  let fixture: ComponentFixture<NavLogoutComponent>;
  let activateService: jasmine.SpyObj<ActivateService>;
  let router: Router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let location: Location;

  const routes = [
    { path: '', component: NavLogoutComponent },
    { path: 'user', component: NavLogoutComponent },
  ];

  beforeEach(waitForAsync(() => {
    const activateServiceSpy = jasmine.createSpyObj('ActivateService', [
      'logout',
    ]);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterLink,
        DropdownComponent,
        ButtonComponent,
        TextfieldComponent,
      ],
      providers: [
        { provide: ActivateService, useValue: activateServiceSpy },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLogoutComponent);
    component = fixture.componentInstance;
    activateService = TestBed.inject(
      ActivateService
    ) as jasmine.SpyObj<ActivateService>;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the dropdown if visible is false', () => {
    component.visible = false;
    fixture.detectChanges();
    const dropdownElement = fixture.debugElement.query(By.css('app-dropdown'));
    expect(dropdownElement).toBeNull();
  });

  it('should display the dropdown if visible is true', () => {
    component.visible = true;
    fixture.detectChanges();
    const dropdownElement = fixture.debugElement.query(By.css('app-dropdown'));
    expect(dropdownElement).not.toBeNull();
  });

  it('should call activateService.logout and navigate to "/" on logout', async () => {
    component.visible = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('app-button'));
    buttonElement.triggerEventHandler('click', null);

    expect(activateService.logout).toHaveBeenCalled();
  });

  it('should show "Mein Konto" link if the current route is not "/user"', async () => {
    await router.navigate(['/']);
    component.visible = true;
    fixture.detectChanges();

    const accountLink = fixture.debugElement.query(
      By.css('a[routerLink="/user"]')
    );
    expect(accountLink).not.toBeNull();
  });

  it('should not show "Mein Konto" link if the current route is "/user"', async () => {
    await router.navigate(['/user']);
    component.visible = true;
    fixture.detectChanges();

    const accountLink = fixture.debugElement.query(
      By.css('a[routerLink="/user"]')
    );
    expect(accountLink).toBeNull();
  });
});
