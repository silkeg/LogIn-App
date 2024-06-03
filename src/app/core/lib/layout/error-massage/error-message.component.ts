import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconErrorComponent } from '../../icons/error/error.component';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, IconErrorComponent],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent implements OnChanges {
  @Input({ required: true }) errorMessage = '';
  @Input({ required: true }) id = '';

  protected message = [''];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorMessage']) {
      this.message = this.errorMessage.split('<br>');
    }
  }
}
