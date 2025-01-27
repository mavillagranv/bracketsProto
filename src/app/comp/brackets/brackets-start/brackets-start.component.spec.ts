import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketsStartComponent } from './brackets-start.component';

describe('BracketsStartComponent', () => {
  let component: BracketsStartComponent;
  let fixture: ComponentFixture<BracketsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketsStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
