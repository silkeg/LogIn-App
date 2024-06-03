import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ContentComponent } from './content.component';
import { ActivateService } from '../../services/activate.service';

class MockActivateService {
  private loggedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  isActivate(): Promise<boolean> {
    return Promise.resolve(this.loggedSubject.value);
  }

  getActivationStatus() {
    return this.loggedSubject.asObservable();
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedSubject.next(loggedIn);
  }
}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let activateServiceMock: MockActivateService;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    activateServiceMock = new MockActivateService();

    activatedRouteMock = {
      url: of([new UrlSegment('test', {})]),
    };

    await TestBed.configureTestingModule({
      imports: [ContentComponent],
      providers: [
        { provide: ActivateService, useValue: activateServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set message to "eingeloggt" if activated', waitForAsync(async () => {
    activateServiceMock.setLoggedIn(true);
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component['message']).toBe('eingeloggt');
  }));

  it('should set message to "ausgeloggt" if not activated', waitForAsync(async () => {
    activateServiceMock.setLoggedIn(false);
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component['message']).toBe('ausgeloggt');
  }));

  it('should set message - page to the last part of the URL', waitForAsync(async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component['page']).toBe('test');
  }));

  it('should set message -  page to "home" if URL is empty', waitForAsync(async () => {
    activatedRouteMock.url = of([]);
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component['page']).toBe('home');
  }));
});
