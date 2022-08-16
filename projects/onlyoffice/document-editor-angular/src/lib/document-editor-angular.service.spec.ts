import { TestBed } from '@angular/core/testing';

import { DocumentEditorAngularService } from './document-editor-angular.service';

describe('DocumentEditorAngularService', () => {
  let service: DocumentEditorAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentEditorAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
