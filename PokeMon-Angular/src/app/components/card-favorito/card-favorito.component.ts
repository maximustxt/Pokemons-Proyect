import { Component } from '@angular/core';
import { ServiciosApiService } from 'src/app/Services/servicios-api.service';
import * as Aos from 'aos';
import {
  User,
  TypesPokemonDB,
  DetailPockemonDB,
  DetailPockemon,
  TypesPokemonApi,
} from 'src/app/Interface/InterfacePockemonApi';

@Component({
  selector: 'app-card-favorito',
  templateUrl: './card-favorito.component.html',
  styleUrls: ['./card-favorito.component.scss'],
})
export class CardFavoritoComponent {
  Favoritos: (DetailPockemon | DetailPockemonDB)[] = [];
  DatosUser!: User;
  NameUser!: string;
  Pokemons!: (DetailPockemon | DetailPockemonDB)[];

  constructor(private serviciosPokemon: ServiciosApiService) {}

  //-------------------------------Funcion typo api:
  isApiPokemon(Pokemon: DetailPockemon | DetailPockemonDB) {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[8-9a-fA-F][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return typeof Pokemon.id === 'string' && !uuidPattern.test(Pokemon.id);
  }

  //-------------------------------Funcion typo DB:
  isDBPokemon(Pokemon: DetailPockemon | DetailPockemonDB) {
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[8-9a-fA-F][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (typeof Pokemon.id === 'string' && !uuidPattern.test(Pokemon.id)) {
      // Si es un número, no es un UUID
      return false;
    } else {
      // Si no es un número, verifica si es un UUID válido
      let poke = Pokemon as DetailPockemonDB;
      return uuidPattern.test(poke.id);
    }
  }

  //--------------------------Obtener Type DB:

  FuncionTypes(Pokemon: DetailPockemon | DetailPockemonDB): TypesPokemonApi[] {
    if ('types' in Pokemon) {
      // con in buscamos la propiedad 'Types dentro del objeto Pokemon
      // Pokemon es de tipo DetailPockemonDB
      return Pokemon.types || [];
    }
    // pokemon es de tipo DetailPockemon
    return [];
  }

  //--------------------------Obtener Type User DB:

  FuncionTypesUser(
    pokemon: DetailPockemon | DetailPockemonDB
  ): TypesPokemonDB[] {
    console.log(pokemon);
    if ('Types' in pokemon) {
      // con in buscamos la propiedad 'Types dentro del objeto pokemon
      // pokemon es de tipo DetailPockemonDB
      return pokemon.Types || [];
    }
    // pokemon es de tipo DetailPockemon
    return [];
  }

  //--------------Transformacion Name :

  transformName(name: string) {
    const nameModificado = name[0].toUpperCase() + name.slice(1);
    return nameModificado;
  }
  //---------------------------------ObtenerLocalStorage:

  ObtenerLocalStorage() {
    const dataLocalStorage = localStorage.getItem('Usuario');
    if (dataLocalStorage) {
      const dato = JSON.parse(dataLocalStorage);
      this.NameUser = dato.name;
      return dato;
    }
  }

  //-------------------------------------------------get Favoritos:

  getFavoritos() {
    this.serviciosPokemon
      .AllFavorites(this.ObtenerLocalStorage().id)
      .subscribe((date) => {
        this.Favoritos = date;
      });
  }

  //------------------------------------------------Get Pokemons User:
  getPokemonsUser() {
    this.serviciosPokemon
      .getPokemonsUser(this.ObtenerLocalStorage().id)
      .subscribe((date) => {
        this.Pokemons = date;
      });
  }

  //------------------------------------Cuando el componente se monta:

  ngOnInit(): void {
    this.getFavoritos();
    this.getPokemonsUser();
    // this.ObtenerLocalStorage();
    Aos.init();
  }
  //-------------------------------Tipos de colores para los types de los pokemons:

  getBackgroundColor(Typo: string): string {
    // colores de los typos de pokemons
    switch (Typo) {
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
}
