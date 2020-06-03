import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePiecesComponent } from './manage-pieces.component';

describe('ManagePiecesComponent', () => {
  let component: ManagePiecesComponent;
  let fixture: ComponentFixture<ManagePiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
