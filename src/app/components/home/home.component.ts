import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from '../../core/layout-site/content/content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  template: '<app-content></ app-content>',
})
export class HomeComponent {}
