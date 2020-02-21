import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopHistoryComponent } from './shop-history.component';

describe('ShopHistoryComponent', () => {
  let component: ShopHistoryComponent;
  let fixture: ComponentFixture<ShopHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
