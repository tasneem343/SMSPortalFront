import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetemplateComponent } from './createtemplate.component';

describe('CreatetemplateComponent', () => {
  let component: CreatetemplateComponent;
  let fixture: ComponentFixture<CreatetemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatetemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
