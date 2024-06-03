import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IconErrorComponent } from '../../icons/error/error.component';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [CommonModule, FormsModule, IconErrorComponent],
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
})
export class TextfieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input({ required: true }) label = '';
  @Input({ required: true }) id = '';
  @Input() name = '';
  @Input() tabindex = 0;
  @Input() required = false;
  @Input() value = '';
  @Input() pattern = '';
  @Input() isError = false;
  @Input() errorMessageId = '';
  @Input() minlength = 0;
  @Input() maxlength = 100;
  protected isEmpty = true;
  protected errorMessage = '';
  protected errorMessageNotEmpty = 'Pflichtfeld darf nicht leer sein.';
  protected errorMessageLessCharacter = 'Zu wenig Zeichen';
  protected errorMessageWrongCharacter = 'Enthält nicht zulässige Zeichen';

  @ViewChild('inputElement', { static: false }) input!: ElementRef;

  ngAfterViewInit() {
    if (!this.input || !this.pattern) return;
    this.input.nativeElement.setAttribute('pattern', this.pattern);
  }

  checkCharacter(value: string) {
    if (!this.pattern) return;
    const pattern = new RegExp(this.pattern);
    this.errorMessage = !pattern.test(value)
      ? this.errorMessageWrongCharacter
      : '';
  }

  checkInput(value: string) {
    this.isEmpty = value.trim() === '';

    if (this.isEmpty) {
      this.errorMessage = this.errorMessageNotEmpty;
    } else if (value.trim().length < this.minlength) {
      this.errorMessage = this.errorMessageLessCharacter;
    } else {
      this.errorMessage = '';
    }
  }

  // Methods from ControlValueAccessor
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // Writes the new value from the Angular form onto the native element
  writeValue(value: string): void {
    this.value = value;
  }

  // Registers a function to be called when the value of the component changes
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Registers a function to be called when the component's touch status changes
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Method to call on input change
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    this.checkCharacter(this.value);
  }
}
