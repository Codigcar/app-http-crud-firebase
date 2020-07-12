import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';
import { PetModel } from '../../models/pet.model';
import { ListpetService } from '../../services/listpet.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  arrayheroes: HeroeModel[] = [];
  arraypets: PetModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService, private listpetService: ListpetService) { }

  ngOnInit(): void {
    this.cargando = true;

    this.listpetService.getAllPets()
      .subscribe( resp => {
        console.log(resp);
        this.arraypets = resp;
        this.cargando = false;
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
