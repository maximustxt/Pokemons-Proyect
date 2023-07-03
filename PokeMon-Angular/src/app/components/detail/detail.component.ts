import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DetailPockemon,
  User,
  TypesPokemonDB,
  DetailPockemonDB,
} from '../../Interface/InterfacePockemonApi';
import { ServiciosApiService } from 'src/app/Services/servicios-api.service';
import * as Aos from 'aos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private readonly router: ActivatedRoute,
    private serviciosPokemon: ServiciosApiService
  ) {}

  booleano!: boolean;
  isDetailPage: boolean = true;
  name!: string;
  DetailPoke!: DetailPockemon;
  DatosUser: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
  };
  private subscription: Subscription = new Subscription();

  //----------------------------------------------------Cuando El componente se desmonta:
  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    if (this.subscription) {
      this.subscription.unsubscribe(); // El método unsubscribe() se utiliza para cancelar la suscripción al observable y dejar de recibir notificaciones. Al llamar a este método, el componente ya no estará escuchando eventos o valores emitidos por el observable.
    }
  }

  //*----------------------------------ObtenerLocalStorage:
  ObtenerLocalStorage() {
    const dataLocalStorage = localStorage.getItem('Usuario');
    if (dataLocalStorage) {
      this.DatosUser = JSON.parse(dataLocalStorage);
    }
  }

  //*------------------------------------------------Favoritos:

  //---------------------------------------------------Post Favoritos:
  PostFavoritos(
    Favorito: DetailPockemon | DetailPockemonDB,
    idPokemon: number
  ) {
    this.booleano = !this.booleano;

    if (this.booleano) {
      if (Favorito.name) {
        const Fav = Favorito as DetailPockemonDB;

        Swal.fire('', 'Agregado Con exito.', 'info');
        Swal.update({
          icon: 'success',
        });
        this.serviciosPokemon.PostFavorites(this.DatosUser.id, Fav).subscribe(
          (date) => {},
          (error) => {
            Swal.fire('Alert', `${error.error.error}`, 'info');
            Swal.update({
              icon: 'warning',
            });
          }
        );
      } else {
        const Fav = Favorito as DetailPockemon;

        Swal.fire('', 'Agregado Con exito.', 'info');
        Swal.update({
          icon: 'success',
        });
        this.serviciosPokemon.PostFavorites(this.DatosUser.id, Fav).subscribe(
          (date) => {},
          (error) => {
            Swal.fire('Alert', `${error.error.error}`, 'info');
            Swal.update({
              icon: 'warning',
            });
          }
        );
      }
    } else {
      if (this.DatosUser.id) {
        this.serviciosPokemon
          .DeleteFavorites(idPokemon, this.DatosUser.id)
          .subscribe(
            (date) => {
              Swal.fire('', 'Eliminado Con exito.', 'info');
              Swal.update({
                icon: 'success',
              });
            },
            (error) => {
              Swal.fire('Alert', `${error.error.error}`, 'info');
              Swal.update({
                icon: 'warning',
              });
            }
          );
      }
    }
  }

  //*--------------------------------------------------------------------------------------------------*//

  MetodoObtengoDato(event: DetailPockemon) {
    if (event?.name) {
      this.DetailPoke = event;
    }
  }

  PrimeraMayuscula(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  porcentajeEstadistica(stadistica: number) {
    const estadistica = stadistica.toString() + '%';
    return estadistica;
  }

  metodoPeso(peso: string) {
    return peso + ' ' + 'kg';
  }

  metodoHabilidad(habilidad: string) {
    return habilidad + ' ' + '?';
  }

  metodoAltura(altura: string) {
    return altura + ' ' + 'm';
  }

  CambiarColorDivTypes(Type: string) {
    switch (Type) {
      case 'fire':
        return '#ff7402';
      case 'water':
        return '#4592c4';
      case 'electric':
        return '#bba909';
      case 'flying':
        return '#3dc7ef';
      case 'bug':
        return '#729f3f';
      case 'ground':
        return '#ab9842';
      case 'grass':
        return '#9bcc50';
      case 'poison':
        return '#2c2d88';
      case 'normal':
        return '#a4acaf';
      default:
        return 'transparent';
    }
  }

  ngOnInit() {
    // this.isDetailPage = true;
    this.ObtenerLocalStorage();
    Aos.init();
    this.router.params.subscribe((params: Params) => {
      this.name = params['name'];
    });
    this.router.data.subscribe(
      (data) => (this.DetailPoke = data['pokemonDataDetail'])
    );
  }

  //-------------------------------------------------FUNCION TYPOS:

  isApiPokemon(pokemon: DetailPockemon | DetailPockemonDB): boolean {
    return typeof pokemon.id === 'number';
  }

  isDBPokemon(pokemon: DetailPockemon) {
    if (typeof pokemon.id === 'number') {
      // Si es un número, no es un UUID
      return false;
    } else {
      // console.log(pokemon.id + 'Linea 170 del Componente detail');
      // Si no es un número, verifica si es un UUID válido
      const uuidPattern =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[8-9a-fA-F][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      // let poke = pokemon as PokemonDB;
      return uuidPattern.test(pokemon.id);
    }
  }
  //-------------------------------------Funcion para obtener el array de typos en la DB:
  FuncioPokemonDB(
    pokemon: DetailPockemon | DetailPockemonDB
  ): TypesPokemonDB[] {
    if ('Types' in pokemon) {
      // con in buscamos la propiedad 'Types dentro del objeto pokemon
      // pokemon es de tipo DetailPockemonDB
      return pokemon.Types || [];
    }
    // pokemon es de tipo DetailPockemon
    return [];
  }
}
