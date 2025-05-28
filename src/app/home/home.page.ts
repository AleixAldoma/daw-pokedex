import { Component, ViewChild } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokedexService } from '../services/pokedex.service';
import { IonContent } from '@ionic/angular';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;
  myPokemon:Pokemon[]=[];
  loaded: boolean = false;
  showLoaded: boolean = false;
  finished: boolean = false;
  myGen: string;

  constructor(private _pokedexService:PokedexService, private router: Router) {
    this._pokedexService.loadAll();
    this.router.events.subscribe((event:RouterEvent) =>{
      if(this.router.url=="/home") document.body.removeAttribute('pokeTheme');
    });
  }

  get gen1Pokemon():Pokemon[]{
    return this._pokedexService.gen1Pokemon;
  }get gen2Pokemon():Pokemon[]{
    return this._pokedexService.gen2Pokemon;
  }get gen3Pokemon():Pokemon[]{
    return this._pokedexService.gen3Pokemon;
  }get gen4Pokemon():Pokemon[]{
    return this._pokedexService.gen4Pokemon;
  }get gen5Pokemon():Pokemon[]{
    return this._pokedexService.gen5Pokemon;
  }get gen6Pokemon():Pokemon[]{
    return this._pokedexService.gen6Pokemon;
  }get gen7Pokemon():Pokemon[]{
    return this._pokedexService.gen7Pokemon;
  }get gen8Pokemon():Pokemon[]{
    return this._pokedexService.gen8Pokemon;
  }get otherPokemon():Pokemon[]{
    return this._pokedexService.otherPokemon;
  }

  search() {
    var search = (<HTMLInputElement>document.getElementById("searchInput"));
    for(var i=0;i<this.myPokemon.length;i++){
      if(this.myPokemon[i].name.toUpperCase().includes(search.value.toUpperCase()) || this.myPokemon[i].mainType.toUpperCase() === search.value.toUpperCase() || this.myPokemon[i].subType?.toUpperCase() === search.value.toUpperCase() || this.myPokemon[i].id.toString() === search.value) {
          document.getElementById("p"+this.myPokemon[i].id).style.display = "";
      }else {
          document.getElementById("p"+this.myPokemon[i].id).style.display = "none";
      }
    }
  }

  goToTop(){
    this.content.scrollToTop(1000);
  }

  genUpdate(){
    var search = (<HTMLInputElement>document.getElementById("searchInput"));
    search.value = '';
    var gen = (<HTMLInputElement> document.getElementById("genInput"));
    this._pokedexService.setMyGeneration = gen.value;
    if(gen.value=="gen1") this.myPokemon = this._pokedexService.gen1Pokemon;
    else if(gen.value=="gen2") this.myPokemon = this._pokedexService.gen2Pokemon;
    else if(gen.value=="gen3") this.myPokemon = this._pokedexService.gen3Pokemon;
    else if(gen.value=="gen4") this.myPokemon = this._pokedexService.gen4Pokemon;
    else if(gen.value=="gen5") this.myPokemon = this._pokedexService.gen5Pokemon;
    else if(gen.value=="gen6") this.myPokemon = this._pokedexService.gen6Pokemon;
    else if(gen.value=="gen7") this.myPokemon = this._pokedexService.gen7Pokemon;
    else if(gen.value=="gen8") this.myPokemon = this._pokedexService.gen8Pokemon;
    else if(gen.value=="other") this.myPokemon = this._pokedexService.otherPokemon;
    this.orderMyPokemon();
  }

  orderMyPokemon(){
    this.myPokemon.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }

}
