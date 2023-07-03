import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filtros, types } from 'src/app/Interface/InterfacePockemonApi';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ServiciosApiService } from '../../Services/servicios-api.service';
import {
  DetailPockemon,
  DetailPockemonDB,
} from '../../Interface/InterfacePockemonApi';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent {
  constructor(private serviciosTypes: ServiciosApiService) {}

  @Output() EnvioArrayPokemonModificado = new EventEmitter<
    (DetailPockemon | DetailPockemonDB)[]
  >();
  @Input() actives!: boolean;
  @Input() pokemons: (DetailPockemon | DetailPockemonDB)[] = [];
  @Output() envioActivesHome = new EventEmitter();
  booleano: boolean = false;
  types: types[] = [];
  Objeto: string[] = [];

  FuncionEnviarActivesHome() {
    this.envioActivesHome.emit(this.actives);
  }

  ngOnInit() {
    this.AllTypesPokemon();
  }
  EnvioArrayModificadoAlPadre() {
    this.EnvioArrayPokemonModificado.emit(this.pokemons);
  }

  FuncionSeteoActives() {
    if (this.actives === false) {
      this.actives = true;
      this.FuncionEnviarActivesHome();
    } else {
      this.actives = false;
      this.FuncionEnviarActivesHome();
    }
  }

  SeleccionOrdenamiento(event: Event) {
    // hsy que indicar que tipo de dato es el event.target , en este caso es de HTMLselectElement.

    this.serviciosTypes.OrdenamientosSelect(event).subscribe((date) => {
      this.pokemons = date;
      this.EnvioArrayModificadoAlPadre();
    });
  }

  async FiltrosTypesPokemon(event: Event, typeName: string) {
    const checked = (event.target as HTMLInputElement).checked; //  el valor booleano del checkbox , devuelve true / false , dependiendo del click.
    // Del evento obtenemos el target ==> quien hizo el evento y checked seria el valor booleano.

    const addType = (type: string) => {
      this.Objeto = [...this.Objeto, type];
    };

    const removeType = (type: string) => {
      this.Objeto = this.Objeto.filter((e) => e !== type);
    };

    if (checked) {
      // si es true , nos pushee en el array.
      addType(typeName);
    } else {
      // si no que lo elimine.
      removeType(typeName);
    }

    try {
      const date = await this.serviciosTypes
        .FiltrosTypes(this.Objeto)
        .toPromise();
      this.pokemons = date as (DetailPockemon | DetailPockemonDB)[];
      this.EnvioArrayModificadoAlPadre();
    } catch (error: any) {
      Swal.fire('Alert', `${error.error.Error}`, 'info');
      Swal.update({
        icon: 'warning',
      });
    }
  }

  //----------------------------------------------------------------------------------------//

  TransformaType(name: string) {
    return name[0].toLocaleUpperCase() + name.slice(1);
  }

  //------------------------------------------------------------------------------------------//
  AllTypesPokemon() {
    this.serviciosTypes
      .AllTypes()
      .pipe(
        catchError((error) => {
          alert('No se encontro ningun Pokemon con ese Nombre');
          return throwError('Error al buscar el Pokémon.');
        }) // En caso de haber un error.....
      )
      .subscribe((date) => {
        // si sale todo bien.....
        this.types = date;
      });
  }
}
