import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditorAngularComponent } from './document-editor-angular.component';

describe('DocumentEditorAngularComponent', () => {
  let component: DocumentEditorAngularComponent;
  let fixture: ComponentFixture<DocumentEditorAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEditorAngularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentEditorAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
