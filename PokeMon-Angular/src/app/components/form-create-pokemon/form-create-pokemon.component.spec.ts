import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePokemonComponent } from './form-create-pokemon.component';

describe('FormCreatePokemonComponent', () => {
  let component: FormCreatePokemonComponent;
  let fixture: ComponentFixture<FormCreatePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreatePokemonComponent]
    });
    fixture = TestBed.createComponent(FormCreatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
