import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconArrowComponent } from '../../../../lib/icons/arrow/arrow.component';

@Component({
  selector: 'app-nav-link-content',
  standalone: true,
  imports: [CommonModule, IconArrowComponent],
  templateUrl: './nav-link-content.component.html',
  styleUrl: './nav-link-content.component.scss',
})
export class NavLinkContentComponent {
  @Input() label = '';
  @Input() arrow = false;
  @Input() isDropdownOpen = false;
}
