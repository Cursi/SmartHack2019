import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeTestComponent } from './iframe-test.component';

describe('IframeTestComponent', () => {
  let component: IframeTestComponent;
  let fixture: ComponentFixture<IframeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
