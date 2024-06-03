import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextfieldComponent } from './textfield.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { IconErrorComponent } from '../../icons/error/error.component';
import { By } from '@angular/platform-browser';

describe('TextfieldComponent', () => {
  let component: TextfieldComponent;
  let fixture: ComponentFixture<TextfieldComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TextfieldComponent, IconErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should write the value correctly', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should show required asterisk if required', () => {
    component.label = 'Test Label';
    component.required = true;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;
    expect(labelElement.textContent).toContain('*');
  });

  it('should update value on input change', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = 'New Value';
    inputElement.dispatchEvent(new Event('input'));
    expect(component.value).toBe('New Value');
  });

  it('should update the value and call onChange on input event', () => {
    spyOn(component, 'onChange').and.callThrough();
    spyOn(component, 'onTouched').and.callThrough();
    const input = inputElement.nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.value).toBe('test');
    expect(component.onChange).toHaveBeenCalledWith('test');
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should call registerOnChange and registerOnTouched', () => {
    const fnChange = jasmine.createSpy('fnChange');
    const fnTouched = jasmine.createSpy('fnTouched');
    component.registerOnChange(fnChange);
    component.registerOnTouched(fnTouched);
    component.onChange('test');
    component.onTouched();
    expect(fnChange).toHaveBeenCalledWith('test');
    expect(fnTouched).toHaveBeenCalled();
  });

  it('should set error message if input is empty and required', () => {
    component.required = true;
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component['errorMessage']).toBe(component['errorMessageNotEmpty']);
  });

  it('should set error message if input length is less than minlength', () => {
    component.required = true;
    component.minlength = 5;
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component['errorMessage']).toBe(
      component['errorMessageLessCharacter']
    );
  });

  it('should set error message if input does not match pattern', () => {
    component.pattern = '\\d+';
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = 'abc';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component['errorMessage']).toBe(
      component['errorMessageWrongCharacter']
    );
  });

  it('should not set error message if input match pattern', () => {
    component.pattern = '^[A-Za-z]+$';
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    inputElement.value = 'abc';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component['errorMessage']).toBeFalsy();
  });
});
