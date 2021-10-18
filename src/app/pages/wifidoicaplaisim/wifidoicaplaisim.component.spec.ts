import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WifidoicaplaisimComponent } from './wifidoicaplaisim.component';

describe('WifidoicaplaisimComponent', () => {
  let component: WifidoicaplaisimComponent;
  let fixture: ComponentFixture<WifidoicaplaisimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifidoicaplaisimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WifidoicaplaisimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
