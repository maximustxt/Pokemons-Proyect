import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Interface/InterfacePockemonApi';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  Form!: FormGroup;

  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    Aos.init();
    this.createForm();
  }

  createForm(): void {
    this.Form = this.formBuilder.group({
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

  guardarLocalStorage(user: User): void {
    localStorage.setItem('Usuario', JSON.stringify(user));
  }

  postInicioSesion(event: Event): void {
    const { email, password } = this.Form.value;

    if (!email || !password) {
      event.preventDefault();
      Swal.fire('Hey user!', 'Debes completar todos los campos.', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else if (this.Form.invalid) {
      // la propiedad invalid nos avisa si hay algun error  en nuestro registro.
      event.preventDefault();
      Swal.fire('Alert', 'Tienes Errores en los campos!', 'info');
      Swal.update({
        icon: 'warning',
      });
    } else {
      this.http
        .post<User>('http://localhost:3001/User/InicioSesion', {
          email,
          password,
        })
        .subscribe(
          (data) => {
            this.guardarLocalStorage(data);
            Swal.fire('', 'Inicio exitoso!', 'info');
            Swal.update({
              icon: 'success',
            });
            this.router.navigate(['/home']);
          },
          (error) => {
            Swal.fire('Hey user!', `${error.error.error}`, 'info');
            Swal.update({
              icon: 'error',
            });
          }
        );
      event.preventDefault();
    }
  }
}
