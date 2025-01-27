import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BGameInformationDialogComponent } from './b-game-information-dialog.component';

describe('BGameInformationDialogComponent', () => {
  let component: BGameInformationDialogComponent;
  let fixture: ComponentFixture<BGameInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BGameInformationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BGameInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
