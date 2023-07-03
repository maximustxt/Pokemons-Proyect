import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ServiciosApiService } from '../../Services/servicios-api.service';
import {
  DetailPockemon,
  DetailPockemonDB,
} from 'src/app/Interface/InterfacePockemonApi';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private serviciosPokemon: ServiciosApiService) {}

  @Input() name!: string;
  @Input() pokemons!: (DetailPockemon | DetailPockemonDB)[];
  @Input() pokemonsBaseDeDatos: (DetailPockemon | DetailPockemonDB)[] = [];
  @Output() Pokemonss = new EventEmitter();
  @Output() activesFiltro = new EventEmitter();
  @Input() actives: boolean = false;

  emitirArray() {
    this.Pokemonss.emit(this.pokemons); // lo que esta dentro de los () => es lo que voy a emitir... en esta caso seria el array modificado de pokemons.
  }
  OnSearch(name: string) {
    if (!name.length) {
      Swal.fire('Hey user!', 'Debes ingresar un nombre!', 'info');
      Swal.update({
        icon: 'warning',
      });
      return;
    }

    this.serviciosPokemon
      .SearchPokemon(name)
      .pipe(
        catchError((error) => {
          Swal.fire(
            'Hey user!',
            'No se encontró ningún Pokemon con ese nombre.',
            'info'
          );
          Swal.update({
            icon: 'warning',
          });
          return throwError('Error al buscar el Pokémon.');
        })
      )
      .subscribe((result: (DetailPockemon | DetailPockemonDB)[]) => {
        if (result && result.length > 0) {
          this.pokemons = result;
        } else {
          Swal.fire(
            'Hey user!',
            'No se encontró ningún Pokemon con ese nombre.',
            'info'
          );
          Swal.update({
            icon: 'warning',
          });
        }

        this.emitirArray();
        // this.emitirArrayDB();
      });
  }
  emitActivesFiltro() {
    this.activesFiltro.emit(this.actives);
  }

  metodoSeteoActive() {
    if (this.actives === false) {
      this.actives = true;
      this.emitActivesFiltro();
    } else {
      this.actives = false;
      this.emitActivesFiltro();
    }
  }
}
