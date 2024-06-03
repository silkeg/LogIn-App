import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isDropdownOpen on toggleDropdown call', () => {
    const event = new Event('click');
    component.toggleDropdown(event);
    expect(component['isDropdownOpen']).toBe(true);
    component.toggleDropdown(event);
    expect(component['isDropdownOpen']).toBe(false);
  });

  it('should close the dropdown on document click if clicked outside', () => {
    component['isDropdownOpen'] = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');
    const outsideElement = document.querySelector('footer');
    outsideElement?.dispatchEvent(event);

    component.onDocumentClick(event);
    expect(component['isDropdownOpen']).toBe(false);
  });

  it('should not close the dropdown on document click if clicked inside', () => {
    component['isDropdownOpen'] = true;
    fixture.detectChanges();

    const event = new MouseEvent('click');

    const dropdownElement = document.querySelector('.bwr-dropdown');
    dropdownElement?.dispatchEvent(event);

    component.onDocumentClick(event);
    expect(component['isDropdownOpen']).toBe(true);
  });
});
