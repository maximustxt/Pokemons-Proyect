import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistro } from 'src/app/Interface/InterfacePockemonApi';
import Swal from 'sweetalert2';
import { ServiciosApiService } from 'src/app/Services/servicios-api.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent {
  //*Rutas User :
  //post => http://localhost:3001/User/ , body(name , email ,  password)  ==> Registro Usuario.
  //post => http://localhost:3001/User/InicioSesion , body(email , password) ==> InicioSesion Del Usuario.
  //*--------------------------------------------------------------------------------------------------//

  FormRegistro!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private Servicios: ServiciosApiService
  ) {}

  createForm(): void {
    this.FormRegistro = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  PostRegistro(event: Event) {
    const { name, password, email } = this.FormRegistro.value as UserRegistro;

    if (!email || !name || !password) {
      event.preventDefault();
      Swal.fire('Alert', 'Debes completar todos los campos!.', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else if (this.FormRegistro.invalid) {
      // la propiedad invalid nos avisa si hay algun error  en nuestro registro.
      event.preventDefault();
      Swal.fire('Alert', 'Tienes Errores en los campos!', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else {
      event.preventDefault();
      this.Servicios.postUserRegistro({ name, password, email }).subscribe(
        (data) => {
          Swal.fire('', 'Registro Exitoso!', 'info');
          Swal.update({
            icon: 'success',
          });
          this.router.navigate(['/Form']);
        },
        (error) => {
          Swal.fire('Alert', `${error.error.error}`, 'info');
          Swal.update({
            icon: 'error',
          });
        }
      );
    }
  }

  ngOnInit(): void {
    this.createForm();
    Aos.init();
  }
}
