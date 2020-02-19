import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetProfileComponent } from './create-pet-profile.component';

describe('CreatePetProfileComponent', () => {
  let component: CreatePetProfileComponent;
  let fixture: ComponentFixture<CreatePetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
