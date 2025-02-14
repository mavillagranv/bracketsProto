import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigleBracketEditorComponent } from './sigle-bracket-editor.component';

describe('SigleBracketEditorComponent', () => {
  let component: SigleBracketEditorComponent;
  let fixture: ComponentFixture<SigleBracketEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigleBracketEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigleBracketEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
