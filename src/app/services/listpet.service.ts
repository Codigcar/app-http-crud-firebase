import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { PetModel } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ListpetService {
  private url = 'http://localhost:8081/api/people/6/pets'

  constructor(private http: HttpClient) { }

  getAllPets( ){
    return this.http.get(`${this.url}`)
    .pipe(
      map( this.crearArregloHeroes )
    );
  }


  private crearArregloHeroes( petObj: object ){

    const arrayHeroes: PetModel[] = [];
    if ( petObj === null){ return []; }

    Object.keys( petObj ).forEach( key => {
      const heroe: PetModel = petObj[key];
      heroe.id = (key) ;

      arrayHeroes.push( heroe );
    });

    return arrayHeroes;
   // console.log('holita');
    
  }

}
