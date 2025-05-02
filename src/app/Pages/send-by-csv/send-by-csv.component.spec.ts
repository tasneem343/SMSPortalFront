import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendByCSVComponent } from './send-by-csv.component';

describe('SendByCSVComponent', () => {
  let component: SendByCSVComponent;
  let fixture: ComponentFixture<SendByCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendByCSVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendByCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
