import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueEditorComponent } from './venue-editor.component';

describe('VenueEditorComponent', () => {
  let component: VenueEditorComponent;
  let fixture: ComponentFixture<VenueEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
