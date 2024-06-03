import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { IconErrorComponent } from '../../icons/error/error.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent, IconErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('app-icon-error');
    expect(icon).not.toBeNull();
  });

  it('should initialize with correct error message and id', waitForAsync(async () => {
    component.id = 'test-id';
    component['message'] = ['Test error message'];

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;

      const errorMessageElement = compiled.querySelector('.bwr-error-message');
      expect(errorMessageElement?.getAttribute('id')).toBe('test-id');
      expect(errorMessageElement?.textContent).toContain('Test error message');
    });
  }));
});
