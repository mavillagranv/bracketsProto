import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BContactTeamsDialogComponent } from './b-contact-teams-dialog.component';

describe('BContactTeamsDialogComponent', () => {
  let component: BContactTeamsDialogComponent;
  let fixture: ComponentFixture<BContactTeamsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BContactTeamsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BContactTeamsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
