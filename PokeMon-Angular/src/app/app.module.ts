import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './components/error404/error404.component';
import { DetailComponent } from './components/detail/detail.component';
import { DataResolverService } from '../Resolvers/data.resolver.service';
import { DetailResolverPokemon } from '../Resolvers/detail.resolver.service';
import { SearchComponent } from './components/search/search.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { FormRegistroComponent } from './components/form-registro/form-registro.component';
import { CommonModule } from '@angular/common';
import { CardFavoritoComponent } from './components/card-favorito/card-favorito.component';
import { FormCreatePokemonComponent } from './components/form-create-pokemon/form-create-pokemon.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SuccessGuard } from './Gards/success-gard.guard';

//More than one module matches. Use the '--skip-import' option to skip importing the component into the closest module or use the module option to specify a module. CUANDO APAREZCA ESTEW ERROR AL CREAR COMPONENTE , INTRODUCIR EL COMANDO : -M APP ===> ESTO LO VA A DECLARAR EN EL APP.
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FormComponent,
    Error404Component,
    DetailComponent,
    SearchComponent,
    FiltrosComponent,
    FormRegistroComponent,
    CardFavoritoComponent,
    FormCreatePokemonComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgxDropzoneModule,
    CloudinaryModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          // aca le envio el resolved con los datos al componente Home : pokemonData ===> {[Array de pokemons]}
          pokemonData: DataResolverService,
        },
      },
      {
        path: 'Perfil',
        component: CardFavoritoComponent,
        canActivate: [SuccessGuard],
      },
      { path: 'Form', component: FormComponent },
      { path: 'FormRegistro', component: FormRegistroComponent },
      {
        path: 'Detail/:id',
        component: DetailComponent,
        resolve: {
          pokemonDataDetail: DetailResolverPokemon,
        },
      },
      {
        path: 'FormCreatePokemon',
        component: FormCreatePokemonComponent,
        canActivate: [SuccessGuard],
      },
      { path: '**', component: Error404Component },
    ]),
    FormsModule,
  ],
  providers: [SuccessGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
