import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ServiciosApiService } from '../app/Services/servicios-api.service';
import {
  DetailPockemon,
  DetailPockemonDB,
} from '../app/Interface/InterfacePockemonApi';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataResolverService
  implements Resolve<(DetailPockemon | DetailPockemonDB)[]>
{
  constructor(private pokemonService: ServiciosApiService) {}

  resolve(): Observable<(DetailPockemon | DetailPockemonDB)[]> {
    return this.pokemonService.getPokemons().pipe(map((data) => data));
  }
}
