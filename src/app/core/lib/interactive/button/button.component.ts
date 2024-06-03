import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: true }) label = '';
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean | null = false;

  get buttonClass() {
    return `bwr-button--${this.type} ${
      this.disabled ? 'bwr-button--disabled' : ''
    }`;
  }
}
