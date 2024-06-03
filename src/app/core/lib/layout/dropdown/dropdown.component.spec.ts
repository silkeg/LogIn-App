import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-dropdown>
      <p class="test-content">Test Content</p>
    </app-dropdown>
  `,
  standalone: true,
  imports: [DropdownComponent],
})
class TestComponent {}

describe('DropdownComponent', () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let testFixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent, TestComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render content inside the dropdown', () => {
    testFixture = TestBed.createComponent(TestComponent);
    testFixture.detectChanges();
    const content = testFixture.debugElement.query(
      By.css('.test-content')
    ).nativeElement;
    expect(content).toBeTruthy();
    expect(content.textContent).toContain('Test Content');
  });
});
