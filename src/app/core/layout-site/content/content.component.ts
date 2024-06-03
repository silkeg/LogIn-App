import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActivateService } from '../../services/activate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit, OnDestroy {
  protected message = '';
  protected page = '';
  private activateSubscription?: Subscription;

  constructor(
    private activateService: ActivateService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.activateSubscription = this.activateService
      .getActivationStatus()
      .subscribe((activate) => {
        this.message = activate ? 'eingeloggt' : 'ausgeloggt';
      });

    this.route.url.subscribe((url) => {
      if (url.length > 0) {
        this.page = url[url.length - 1].path;
      } else {
        this.page = 'home';
      }
    });
  }

  ngOnDestroy() {
    if (this.activateSubscription) {
      this.activateSubscription.unsubscribe();
    }
  }
}
