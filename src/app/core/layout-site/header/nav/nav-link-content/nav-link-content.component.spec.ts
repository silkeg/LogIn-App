import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLinkContentComponent } from './nav-link-content.component';
import { By } from '@angular/platform-browser';

describe('NavLinkContentComponent', () => {
  let component: NavLinkContentComponent;
  let fixture: ComponentFixture<NavLinkContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinkContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLinkContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('.bwr-nav__link--label')
    ).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should display the arrow when arrow input is true', () => {
    component.arrow = true;
    fixture.detectChanges();
    const arrowElement = fixture.debugElement.query(By.css('app-icon-arrow'));
    expect(arrowElement).toBeTruthy();
  });

  it('should add the rotate open class when isDropdownOpen is true', () => {
    component.arrow = true;
    component.isDropdownOpen = true;
    fixture.detectChanges();
    const arrowElement = fixture.debugElement.query(
      By.css('app-icon-arrow')
    ).nativeElement;
    expect(arrowElement.classList).toContain('bwr-icon-arrow--rotate--open');
  });

  it('should not add the rotate open class when isDropdownOpen is false', () => {
    component.arrow = true;
    component.isDropdownOpen = false;
    fixture.detectChanges();
    const arrowElement = fixture.debugElement.query(
      By.css('app-icon-arrow')
    ).nativeElement;
    expect(arrowElement.classList).not.toContain(
      'bwr-icon-arrow--rotate--open'
    );
  });
});
