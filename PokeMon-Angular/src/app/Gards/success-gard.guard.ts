import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { User } from '../Interface/InterfacePockemonApi';
import { ServiciosApiService } from '../Services/servicios-api.service';

@Injectable()
export class SuccessGuard implements CanActivate {
  constructor(private serviciosApiService: ServiciosApiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const dataLocalStorage = localStorage.getItem('Usuario');

    const datoLocalStorage: User = JSON.parse(dataLocalStorage as string);

    if (
      datoLocalStorage.name &&
      datoLocalStorage.email &&
      datoLocalStorage.password &&
      datoLocalStorage.id
    ) {
      return this.serviciosApiService.AllFavorites(datoLocalStorage.id).pipe(
        map((date) => true),
        catchError((error) => {
          // Aquí puedes manejar el error como desees
          Swal.fire('Alert', `${error.error.error}`);
          Swal.update({
            icon: 'warning',
          });
          return throwError(error); // Opcionalmente, puedes relanzar el error
        })
      );
    } else {
      return false;
    }
  }
}
