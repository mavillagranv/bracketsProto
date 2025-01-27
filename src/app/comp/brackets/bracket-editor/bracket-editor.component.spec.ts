import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketEditorComponent } from './bracket-editor.component';

describe('BracketEditorComponent', () => {
  let component: BracketEditorComponent;
  let fixture: ComponentFixture<BracketEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BracketEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
