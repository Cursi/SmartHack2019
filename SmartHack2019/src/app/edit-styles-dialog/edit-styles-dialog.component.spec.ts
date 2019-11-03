import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStylesDialogComponent } from './edit-styles-dialog.component';

describe('EditStylesDialogComponent', () => {
  let component: EditStylesDialogComponent;
  let fixture: ComponentFixture<EditStylesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStylesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStylesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
