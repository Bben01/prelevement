import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPieceComponent } from './add-piece.component';

describe('AddPieceComponent', () => {
  let component: AddPieceComponent;
  let fixture: ComponentFixture<AddPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
