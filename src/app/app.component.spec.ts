import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivateService } from './core/services/activate.service';
import { HeaderComponent } from './core/layout-site/header/header.component';
import { FooterComponent } from './core/layout-site/footer/footer.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, FooterComponent],
      providers: [ActivateService, provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'app-login' title`, () => {
    expect(component.title).toEqual('app-login');
  });

  it('should render header, main, and footer elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('main.bwr-main')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
