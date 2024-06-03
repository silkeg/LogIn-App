import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setButtonProperties(properties: Partial<ButtonComponent>) {
    Object.assign(component, properties);
    fixture.detectChanges();
  }
  function getButtonElement() {
    return fixture.debugElement.query(By.css('button')).nativeElement;
  }

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    setButtonProperties({ label: 'Test Button' });
    const buttonElement = getButtonElement();
    expect(buttonElement.textContent).toContain('Test Button');
  });

  it('should apply primary class', () => {
    setButtonProperties({ type: 'primary' });
    const buttonElement = getButtonElement();
    expect(buttonElement.className).toContain('button--primary');
  });

  it('should apply disabled class when disabled is true', () => {
    setButtonProperties({ disabled: true });
    const buttonElement = getButtonElement();
    expect(buttonElement.className).toContain('button--disabled');
    expect(buttonElement.disabled).toBeTrue();
  });

  it('should be clickable when disabled is false', () => {
    setButtonProperties({ disabled: false });
    const buttonElement = getButtonElement();

    let clicked = false;
    buttonElement.addEventListener('click', () => (clicked = true));
    buttonElement.click();
    expect(clicked).toBeTrue();
  });

  it('should not be clickable when disabled is true', () => {
    setButtonProperties({ disabled: true });
    const buttonElement = getButtonElement();

    let clicked = false;
    buttonElement.addEventListener('click', () => (clicked = true));
    buttonElement.click();
    expect(clicked).toBeFalse();
  });
});
