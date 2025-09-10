import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCarouselSkeletonComponent } from './feature-carousel-skeleton.component';

describe('FeatureCarouselSkeletonComponent', () => {
  let component: FeatureCarouselSkeletonComponent;
  let fixture: ComponentFixture<FeatureCarouselSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCarouselSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCarouselSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
