import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconArrowComponent } from './arrow.component';
import { By } from '@angular/platform-browser';
import { RouterModule, provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../../../app.routes';
import { ActivateService } from '../../../services/activate.service';

describe('IconArrowComponent', () => {
  let component: IconArrowComponent;
  let fixture: ComponentFixture<IconArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, IconArrowComponent],
      providers: [ActivateService, provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply width style to the div', () => {
    component.width = '3rem';
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('span'));
    expect(div.styles['width']).toBe('3rem');
  });

  it('should render svg ', () => {
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeTruthy();
  });
});
