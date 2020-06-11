import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroes-app-e1597.firebaseio.com'

  constructor(private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel ){
    return this.http.post(`${ this.url }/heroes.json`, heroe)
            .pipe(
              map( (resp: any)  =>{
                heroe.id = resp.name;
                return heroe;
              })
            );
  }

  putHeroe(heroe: HeroeModel){

    const heroeTemp ={
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getAllHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( this.crearArregloHeroes )
      );
  }

  private crearArregloHeroes( heroesObj: object ){

    const arrayHeroes: HeroeModel[] = [];

    // console.log(heroesObj);

    if ( heroesObj === null){ return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      arrayHeroes.push( heroe );
    });

    return arrayHeroes;
  }

  getHeroeById( id: string){
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  deleteHeroeById( id: string){
    return this.http.delete(`${this.url}/heroes/${ id }.json`);
  }
}
