import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { ActivateService } from '../../services/activate.service';

class MockActivateService {
  isActivate() {
    return Promise.resolve(true);
  }
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  let activateServiceMock: MockActivateService;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    activateServiceMock = new MockActivateService();
    activatedRouteMock = {
      url: of([new UrlSegment('test', {})]),
    };
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: ActivateService, useValue: activateServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a image with src and alt attributes', () => {
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBeTruthy();
    expect(img?.getAttribute('alt')).toBeTruthy();
  });

  it('should contain the class "bwr-header"', () => {
    const element = compiled.querySelector('header');
    expect(element?.classList).toContain('bwr-header');
  });
});
