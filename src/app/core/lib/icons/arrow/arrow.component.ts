import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow.component.html',
  styleUrl: './arrow.component.scss',
})
export class IconArrowComponent {
  @Input() width = '1.5rem';
}
