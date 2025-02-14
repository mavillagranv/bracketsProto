import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePreviewDialogComponent } from './venue-preview-dialog.component';

describe('VenuePreviewDialogComponent', () => {
  let component: VenuePreviewDialogComponent;
  let fixture: ComponentFixture<VenuePreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuePreviewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
