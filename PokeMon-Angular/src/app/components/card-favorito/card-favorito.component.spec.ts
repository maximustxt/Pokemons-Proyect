import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFavoritoComponent } from './card-favorito.component';

describe('CardFavoritoComponent', () => {
  let component: CardFavoritoComponent;
  let fixture: ComponentFixture<CardFavoritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFavoritoComponent]
    });
    fixture = TestBed.createComponent(CardFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
