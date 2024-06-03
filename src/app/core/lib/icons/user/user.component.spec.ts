import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUserComponent } from './user.component';
import { By } from '@angular/platform-browser';

describe('IconUserComponent', () => {
  let component: IconUserComponent;
  let fixture: ComponentFixture<IconUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconUserComponent);
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
