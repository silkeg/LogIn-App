import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
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

  it('should contain the class "bwr-footer"', () => {
    const ulElement = compiled.querySelector('ul');
    expect(ulElement?.classList).toContain('bwr-footer');
  });
});
