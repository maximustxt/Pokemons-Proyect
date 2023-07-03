import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
  DetailPockemon,
  User,
  DetailPockemonDB,
  TypesPokemonDB,
  TypesPokemonApi,
} from '../../Interface/InterfacePockemonApi';
import * as Aos from 'aos';
import { Router } from '@angular/router';
import { ServiciosApiService } from '../../Services/servicios-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ObjetoDetail!: DetailPockemon;
  public isDetailPage: boolean = false;
  pokemons: (DetailPockemon | DetailPockemonDB)[] = [];
  name: string = '';
  DatosUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };
  @Output() DetailPokemon = new EventEmitter();
  actives!: boolean;

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private serviciosPokemon: ServiciosApiService
  ) {}

  //--------------------------------VALORES RECIBIDOS:

  ReciboActivesDeFiltros(value: boolean) {
    this.actives = value;
  }

  RecibirAtiveFiltro(actives: boolean) {
    this.actives = actives;
  }
  RecibirEmicionDeSearch(arrayPokemon: (DetailPockemon | DetailPockemonDB)[]) {
    this.pokemons = arrayPokemon;
  }

  //-------------------------------------VALORES EXPORTADOS:

  MandarIdDetail(name: string) {
    this.serviciosPokemon.getDetailPokemon(name);
  }

  isApiPokemon(Pokemon: DetailPockemon | DetailPockemonDB): boolean {
    return typeof Pokemon.id === 'number';
  }

  isDBPokemon(Pokemon: DetailPockemon | DetailPockemonDB): boolean {
    if (typeof Pokemon.id === 'number') {
      // Si es un número, no es un UUID
      return false;
    } else {
      // Si no es un número, verifica si es un UUID válido
      const uuidPattern =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[8-9a-fA-F][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      let poke = Pokemon as DetailPockemonDB;
      return uuidPattern.test(poke.id);
    }
  }

  getPokemonImageUrl(url: string): string {
    const pokemonId = url.split('/').slice(-2, -1)[0];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  }

  DirijirAFormulario() {
    this.router.navigate(['/Form']);
  }

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

  transformName(name: string) {
    const nameModificado = name[0].toUpperCase() + name.slice(1);
    return nameModificado;
  }

  ngOnInit(): void {
    Aos.init();
    if (!this.pokemons.length) {
      this.route.data.subscribe((data) => {
        this.pokemons = data['pokemonData'];
        /*
        En TypeScript, la palabra clave `as` se utiliza para realizar una conversión de tipo explícita o "type assertion". Proporciona una forma de decirle al compilador que tratemos un valor como si fuera de un tipo específico, aunque el compilador no pueda inferirlo automáticamente.
        
        La necesidad de utilizar `as` y especificar el tipo de dato surge en situaciones en las que el compilador no puede determinar con certeza el tipo de un valor. Esto puede ocurrir en casos como:
        
        1. Union Types (Tipos de Unión): Cuando tienes una variable o parámetro que puede ser de diferentes tipos utilizando el operador `|`. En este caso, es posible que necesites utilizar `as` para indicar al compilador que trate el valor como uno de los tipos de la unión.
        */
      });
    }
  }

  MetodoArrayPokemonModificado(
    arrayPokemon: (DetailPockemon | DetailPockemonDB)[]
  ) {
    this.pokemons = arrayPokemon;
  }

  FuncioPokemonDB(
    pokemon: DetailPockemon | DetailPockemonDB
  ): TypesPokemonDB[] {
    // PARA CONVERTIR UN OBJETO A JSON ===> JSON.stringify();
    //PARA CONVERTIR UN JSON A OBJETO ===> JSON.parse();
    if ('Types' in pokemon) {
      return pokemon.Types || [];
    }
    return [];
  }

  FuncionTypes(Pokemon: DetailPockemon | DetailPockemonDB): TypesPokemonApi[] {
    if ('types' in Pokemon) {
      // con in buscamos la propiedad 'Types dentro del objeto Pokemon
      // Pokemon es de tipo DetailPockemonDB
      return Pokemon.types || [];
    }
    // pokemon es de tipo DetailPockemon
    return [];
  }
}
