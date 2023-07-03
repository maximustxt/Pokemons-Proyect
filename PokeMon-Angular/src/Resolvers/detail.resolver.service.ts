import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ServiciosApiService } from '../app/Services/servicios-api.service';
import { Observable } from 'rxjs';
import { DetailPockemon } from '../app/Interface/InterfacePockemonApi';

@Injectable({ providedIn: 'root' })
export class DetailResolverPokemon implements Resolve<DetailPockemon> {
  constructor(private pokemonService: ServiciosApiService) {}

  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<DetailPockemon> | Promise<DetailPockemon> | DetailPockemon {
    //La razón principal de devolver una Promesa en este caso es que la resolución de la ruta puede requerir la realización de operaciones asincrónicas, como por ejemplo, hacer una solicitud HTTP para obtener los detalles de un Pokemon desde un servidor. Al devolver una Promesa, se permite que el enrutador espere a que la Promesa se resuelva antes de continuar con la navegación.

    const pokemonId: string | null = route.paramMap.get('id');

    if (typeof pokemonId === 'string') {
      return this.pokemonService.getDetailPokemon(pokemonId);
    } else {
      throw new Error('Invalid pokemonId');
    }
  }
}
