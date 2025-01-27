import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketPreviewDialogComponent } from './bracket-preview-dialog.component';

describe('BracketPreviewDialogComponent', () => {
  let component: BracketPreviewDialogComponent;
  let fixture: ComponentFixture<BracketPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketPreviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
