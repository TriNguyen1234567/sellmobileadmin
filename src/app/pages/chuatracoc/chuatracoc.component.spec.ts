import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuatracocComponent } from './chuatracoc.component';

describe('ChuatracocComponent', () => {
  let component: ChuatracocComponent;
  let fixture: ComponentFixture<ChuatracocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChuatracocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChuatracocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
