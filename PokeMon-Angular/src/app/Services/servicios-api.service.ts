import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {
  DetailPockemon,
  types,
  AbilitiesPokemon,
  Cloudinary,
  PkemonCrear,
  UserRegistro,
  DetailPockemonDB,
} from '../Interface/InterfacePockemonApi';

//* COMANDO PARA CREAR SERVICIO ES : NG G S <NOMBRE-DEL-SERVICIO>

/*
//* RUTAS DESDE EL BACK: 

//* Rutas Pokemons :
get =>  http://localhost:3001/Pokemon ===> All Pokemons
get =>  http://localhost:3001/Pokemon?idUser=idUser ===> All Pokemons User
get =>  http://localhost:3001/Pokemon/${name} ===> Detail
get =>  http://localhost:3001/Pokemon/search/${name} ===> Search
//*------------------------------------------------------------//

//* Rutas Favoritos : 
get =>  http://localhost:3001/Favoritos/${idUser} ===> Todo los favoritos del usuario
post => http://localhost:3001/Favoritos/${idUser}  , Body(name , peso , altura , imagen) ===> Posteo de favorito del usuario.
delete => http://localhost:3001/Favoritos/${idPokemon}?idUser=${idUser} ===>  Eliminar Favorito.
//*----------------------------------------------------------------------------------------------//

//*Rutas User :
post => http://localhost:3001/User/ , body(name , email ,  password)  ==> Registro Usuario.
post => http://localhost:3001/User/InicioSesion , body(email , password) ==> InicioSesion Del Usuario.
//*--------------------------------------------------------------------------------------------------//

//*Rutas Types:
get => http://localhost:3001/Types  ===> nos traemos todos los types.
//*----------------------------------------------------------------------//


//*Rutas Filtros:
get => http://localhost:3001/Filtros/Ordenamientos/${valorSeleccionado}  ===> Ordeno por lo que le pase por params.
get => http://localhost:3001/Filtros/Ordenamientos , body(typos de pokemons)  ===> Le envio un objeto de los tipos de pokemons seleccionados y se los envio por Body.
//*----------------------------------------------------------------------//


//*Rutas Habilidades:
get => http://localhost:3001/Abilities  ===> trae las habilidades.
//*----------------------------------------------------------------------//



*/

@Injectable({
  providedIn: 'root',
})
export class ServiciosApiService {
  constructor(private http: HttpClient) {}

  //*-------------------------------------------------------------Pokemons:

  public getPokemonsUser(
    id: string
  ): Observable<(DetailPockemon | DetailPockemonDB)[]> {
    return this.http.get<(DetailPockemon | DetailPockemonDB)[]>(
      `http://localhost:3001/Pokemon/UserPoke?idUser=${id}`
    );
  }

  public getPokemons(): Observable<(DetailPockemon | DetailPockemonDB)[]> {
    return this.http.get<(DetailPockemon | DetailPockemonDB)[]>(
      'http://localhost:3001/Pokemon'
    );
  }

  public postPokemons(pokemon: PkemonCrear, idUser: string) {
    return this.http.post(`http://localhost:3001/Pokemon/${idUser}`, pokemon);
  }

  //*-------------------------------------------------------------------Abilities:
  public getAbilities() {
    return this.http.get<AbilitiesPokemon[]>('http://localhost:3001/Abilities');
  }
  //*---------------------------------------------------------------------Detail:
  public getDetailPokemon(name: string): Observable<DetailPockemon> {
    return this.http.get<DetailPockemon>(
      `http://localhost:3001/Pokemon/${name}`
    );
  }

  public SearchPokemon(
    name: string
  ): Observable<(DetailPockemon | DetailPockemonDB)[]> {
    return this.http.get<(DetailPockemon | DetailPockemonDB)[]>(
      `http://localhost:3001/Pokemon/search/${name}`
    );
  }

  public AllTypes(): Observable<types[]> {
    return this.http.get<types[]>(`http://localhost:3001/Types`);
  }

  //*--------------------------------------Favoritos----------------------------------------*//

  public AllFavorites(
    idUser: number
  ): Observable<(DetailPockemon | DetailPockemonDB)[]> {
    return this.http.get<(DetailPockemon | DetailPockemonDB)[]>(
      `http://localhost:3001/Favoritos/${idUser}`
    );
  }

  public PostFavorites(
    idUser: number,
    Favorito: DetailPockemon | DetailPockemonDB
  ) {
    return this.http.post(
      `http://localhost:3001/Favoritos/${idUser}`,
      Favorito
    );
  }

  public DeleteFavorites(idPokemon: number, idUser: number) {
    return this.http.delete(
      `http://localhost:3001/Favoritos/${idPokemon}?idUser=${idUser}`
    );
  }

  //*---------------------------------------Filtros-----------------------------------------------*//

  public FiltrosTypes(objetoTypes: string[]) {
    let URL = 'http://localhost:3001/Filtros';

    return this.http.get(`${URL}?ArrayType=${objetoTypes}`);
  }

  public OrdenamientosSelect(nombreOrdenamiento: Event) {
    const valorSeleccionado = (nombreOrdenamiento.target as HTMLSelectElement)
      .value;

    return this.http.get<(DetailPockemon | DetailPockemonDB)[]>(
      `http://localhost:3001/Filtros/Ordenamientos/${valorSeleccionado}`
    );
  }
  //*-------------------------------------------------------------------Cloudinary:
  public postCloudinary(data: FormData) {
    return this.http.post<Cloudinary>(
      'https://api.cloudinary.com/v1_1/dpp1n1qjs/image/upload',
      data
    );
  }

  //*----------------------------------------------------------------Post User:
  public postUserRegistro({ name, password, email }: UserRegistro) {
    return this.http.post<Cloudinary>('http://localhost:3001/User', {
      name,
      password,
      email,
    });
  }
}
