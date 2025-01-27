import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BPoolEditorComponent } from './b-pool-editor.component';

describe('BPoolEditorComponent', () => {
  let component: BPoolEditorComponent;
  let fixture: ComponentFixture<BPoolEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BPoolEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BPoolEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
