import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtacvienComponent } from './congtacvien.component';

describe('CongtacvienComponent', () => {
  let component: CongtacvienComponent;
  let fixture: ComponentFixture<CongtacvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongtacvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtacvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
