import { Component } from '@angular/core';
import { ServiciosApiService } from 'src/app/Services/servicios-api.service';
import {
  types,
  AbilitiesPokemon,
  Cloudinary,
  Pokemon,
} from 'src/app/Interface/InterfacePockemonApi';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-form-create-pokemon',
  templateUrl: './form-create-pokemon.component.html',
  styleUrls: ['./form-create-pokemon.component.scss'],
})
export class FormCreatePokemonComponent {
  constructor(
    private router: Router,
    private serviciosTypes: ServiciosApiService
  ) {}

  errores!: string;
  AbilitiesPokemon: AbilitiesPokemon[] = [];
  idUser!: string;
  pokemon: Pokemon = {
    name: '',
    sprites: {
      back_default: '',
      front_default: '',
      back_shiny: '',
      front_shiny: '',
      other: {
        dream_world: {
          front_default: '',
        },
      },
    },
    abilities: [{ ability: { name: '' } }],
    stats: [
      { base_stat: 0, stat: { name: 'hp' } },
      { base_stat: 0, stat: { name: 'attack' } },
      { base_stat: 0, stat: { name: 'special-attack' } },
      { base_stat: 0, stat: { name: 'special-defense' } },
      { base_stat: 0, stat: { name: 'speed' } },
      { base_stat: 0, stat: { name: 'defense' } },
    ], // las habilidades
    height: '',
    weight: '',
    species: { name: '' },
    types: [0],
  };

  seleccionTipos: types[] = [];
  SelectTypes: types[] = [];
  types: number[] = [];
  seleccionAbilities: string[] = [];

  FuncionSeteotypes(event: Event) {
    // lo que debo hacer es que cuando seleccione un typo debo mandar un array de numeros.
    const value = (event.target as HTMLInputElement).value;

    if (!isNaN(Number(value))) {
      this.types = [...this.types, Number(value)];
      const arraySelectTypes = this.SelectTypes.filter(
        (e) => e.id === Number(value)
      );

      let a = new Set([...this.seleccionTipos, ...arraySelectTypes]);

      this.seleccionTipos = [...a];

      const array = this.seleccionTipos.map((e) => e.id);
      this.pokemon.types = array;
    }
  }
  //----------------------------------------------------Delete Types:
  //Crear funcion que cuando haga click en la x me elimine el tipo seleccionado.
  FuncionDeleteTypeSelect(id: number) {
    this.seleccionTipos = this.seleccionTipos.filter((e) => e.id !== id);
    this.pokemon.types = this.seleccionTipos.map((e) => e.id);
  }

  //---------------------------------------------------Traer types
  traertypes() {
    this.serviciosTypes.AllTypes().subscribe(
      (date) => {
        // si sale todo bien.....
        this.SelectTypes = date;
      },
      (error) => {
        alert(`${error.error.error}`);
      }
    );
  }

  //-------------------------------------------------------Traer Abilities:

  funcionTraerAbilities() {
    this.serviciosTypes
      .getAbilities()
      .subscribe((date) => (this.AbilitiesPokemon = date));
  }

  //---------------------------------ObtenerLocalStorage:

  ObtenerLocalStorage() {
    const dataLocalStorage = localStorage.getItem('Usuario');
    if (dataLocalStorage) {
      const dato = JSON.parse(dataLocalStorage);
      this.idUser = dato.id;

      return dato;
    }
  }

  //-------------------------------------------------------Cuando el componente se monte:
  ngOnInit() {
    Aos.init();
    this.traertypes();
    this.funcionTraerAbilities();
    this.ObtenerLocalStorage();
  }

  //---------------------------------------------------Funciones stack:

  FuncionStatAttack(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'attack' ? { ...e, base_stat: Number(value) } : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  //*-----------------------------------------FuncionHP:
  FuncionStatHP(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'hp' ? { ...e, base_stat: Number(value) } : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  //*-----------------------------------------FuncionStatspecialAttack:
  FuncionStatspecialAttack(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'special-attack'
          ? { ...e, base_stat: Number(value) }
          : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  //*------------------------------------------FuncionStatspecialDefense:
  FuncionStatspecialDefense(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'special-defense'
          ? { ...e, base_stat: Number(value) }
          : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  //*-----------------------------------------FuncionStatSpeed:
  FuncionStatSpeed(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'speed' ? { ...e, base_stat: Number(value) } : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  //*-----------------------------------------FuncionStatDefense:
  FuncionStatsDefense(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear una copia del objeto this.pokemon
    const updatedPokemon = {
      ...this.pokemon,
      stats: [...this.pokemon.stats].map((e) =>
        e.stat.name === 'defense' ? { ...e, base_stat: Number(value) } : e
      ),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon; // mutacion
  }

  FuncionSelectAbilitie(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    // Crear un nuevo conjunto Set con las habilidades existentes
    const existingAbilities = new Set(
      this.pokemon.abilities.map((e) => e.ability.name)
    );

    // Agregar la nueva habilidad al conjunto
    existingAbilities.add(value);

    // Crear un nuevo array sin duplicados a partir del conjunto Set
    const uniqueAbilities = Array.from(existingAbilities); // lo que hace es crear un nuevo array con el metodo Array.Form(y aca el array que queremos extraer los datos.)

    let ArrayHabilidades = uniqueAbilities.filter(
      (e) => e.length && e !== 'Seleccionar una Habilidad'
    );

    this.seleccionAbilities = ArrayHabilidades;

    // Crear el objeto actualizado con el array de habilidades sin duplicados
    const updatedPokemon = {
      ...this.pokemon,
      abilities: this.seleccionAbilities.map((name) => ({
        ability: { name: name },
      })),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon;
  }

  //-------------------------------------------------------Delete Abilities:

  FuncionDeleteAbilitieSelect(value: string) {
    this.seleccionAbilities = this.seleccionAbilities.filter(
      (e) => e !== value
    );
    // Crear el objeto actualizado con el array de habilidades sin duplicados
    const updatedPokemon = {
      ...this.pokemon,
      abilities: this.seleccionAbilities.map((name) => ({
        ability: { name: name },
      })),
    };

    // Actualizar el objeto this.pokemon con la copia modificada
    this.pokemon = updatedPokemon;
  }

  //-------------------------------------------CLOUDINARY:
  files: File[] = [];

  onSelect(event: any) {
    if (!this.files.length) {
      this.files.push(...event.addedFiles);
    } else {
      for (let i = 0; i < this.files.length; i++) {
        const element = this.files[i].name;
        if (!element === event.addedFiles[0].name && this.files.length === 0) {
          this.files.push(...event.addedFiles);
        }
      }
    }
    if (this.files.length) {
      const File_data = this.files[0];
      const datosImage = new FormData();
      datosImage.append('file', File_data);
      datosImage.append('upload_preset', 'Angular_cloudinary');
      datosImage.append('cloud_name', 'dpp1n1qjs');

      this.serviciosTypes
        .postCloudinary(datosImage)
        .subscribe((date: Cloudinary) => {
          let DataImagen = date.secure_url;

          const updatedPokemon = {
            ...this.pokemon,
            sprites: {
              ...this.pokemon.sprites,
              other: {
                dream_world: {
                  front_default: DataImagen,
                },
              },
            },
          };

          // Actualizar el objeto this.pokemon con la copia modificada
          this.pokemon = updatedPokemon;
        });
    }
  }

  onRemove(event: any) {
    //  const valor = (event.target as HTMLInputElement).value
    this.files.splice(this.files.indexOf(event), 1);
  }

  FuncionHeight(data: string) {
    if (typeof Number(data) === 'number') return true;
    return false;
  }

  //-----------------------------------------Post Crear Pokemon:

  CrearPokemon(event: Event) {
    const { species, abilities, name, height, weight, types, stats, sprites } =
      this.pokemon;

    if (
      !types.length ||
      !name.length ||
      !height ||
      !weight ||
      stats[0].base_stat === 0 ||
      !abilities[0].ability.name.length ||
      !species.name.length ||
      !sprites.other.dream_world.front_default.length
    ) {
      event.preventDefault();
      Swal.fire('Alert', 'Debes completar todos los campos!.', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else if (
      this.pokemon.stats.filter((e) => e.base_stat < 0).map((e) => e.base_stat)
        .length
    ) {
      event.preventDefault();
      Swal.fire('Alert', 'Tienes errores en los stats', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else {
      this.serviciosTypes.postPokemons(this.pokemon, this.idUser).subscribe(
        (date) => {
          if (date) {
            this.router.navigate(['/home']);
            Swal.fire('', 'Pokemon Creado con exito', 'info');
            Swal.update({
              icon: 'success',
            });
            // aca vamos a hacer un post del pokemon y comprobar si llegan los datos correctamente.
          }
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
