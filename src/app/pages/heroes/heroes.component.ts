import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  arrayheroes: HeroeModel[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {

    this.heroesService.getAllHeroes()
      .subscribe( resp => {
        console.log(resp);
        this.arrayheroes = resp;
      });

  }

  deleteHeroById( heroe: HeroeModel, i: number ){
    Swal.fire({
      title:'Está seguro?',
      text:`Está seguro que desea borrar a ${ heroe.nombre}`,
      icon:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value){
        this.arrayheroes.splice(i, 1);
        this.heroesService.deleteHeroeById( heroe.id ).subscribe();
      }
    });
  }
}
