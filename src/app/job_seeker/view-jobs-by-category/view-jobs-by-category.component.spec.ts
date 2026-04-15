import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobsByCategoryComponent } from './view-jobs-by-category.component';

describe('ViewJobsByCategoryComponent', () => {
  let component: ViewJobsByCategoryComponent;
  let fixture: ComponentFixture<ViewJobsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJobsByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
