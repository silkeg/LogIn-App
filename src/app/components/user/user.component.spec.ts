import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { ActivateService } from '../../core/services/activate.service';
import { of } from 'rxjs';

class MockActivateService {
  isActivate() {
    return Promise.resolve(true);
  }
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let activateServiceMock: MockActivateService;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    activateServiceMock = new MockActivateService();
    activatedRouteMock = {
      url: of([new UrlSegment('test', {})]),
    };
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: ActivateService, useValue: activateServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render content element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-content')).toBeTruthy();
  });
});
