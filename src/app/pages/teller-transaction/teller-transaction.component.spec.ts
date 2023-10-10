import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TellerTransactionComponent } from './teller-transaction.component';

describe('TellerTransactionComponent', () => {
  let component: TellerTransactionComponent;
  let fixture: ComponentFixture<TellerTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TellerTransactionComponent]
    });
    fixture = TestBed.createComponent(TellerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
