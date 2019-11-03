import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveResourceDialogComponent } from './remove-resource-dialog.component';

describe('RemoveResourceDialogComponent', () => {
  let component: RemoveResourceDialogComponent;
  let fixture: ComponentFixture<RemoveResourceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveResourceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
