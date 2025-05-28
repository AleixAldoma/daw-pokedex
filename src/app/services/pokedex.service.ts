import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonPageModule } from '../pages/pokemon/pokemon.module';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private BASE_URL = "https://pokeapi.co/api/v2/"
  private POKEMON_ENDPOINT = "pokemon"
  private _pokemonArrayG1:Pokemon[]=[];
  private _pokemonArrayG2:Pokemon[]=[];
  private _pokemonArrayG3:Pokemon[]=[];
  private _pokemonArrayG4:Pokemon[]=[];
  private _pokemonArrayG5:Pokemon[]=[];
  private _pokemonArrayG6:Pokemon[]=[];
  private _pokemonArrayG7:Pokemon[]=[];
  private _pokemonArrayG8:Pokemon[]=[];
  private _pokemonArrayOther:Pokemon[]=[];

  private _myGen:string = "gen1";

  private _totalPages: number = 0;
  private _nextPage: number = 0;
  public isLoaded: boolean = false;

  constructor(private _http:HttpClient) {
  }

  

  loadAll():void{
      this._http.get(this.BASE_URL+this.POKEMON_ENDPOINT+"?offset=0&limit=99999").subscribe(
        (pkmn:any)=>{
          for(let i=0;i<pkmn.results.length;i++){
            this._http.get(pkmn.results[i].url).subscribe(
              (pkmn:any)=>{
                if(pkmn.types.length>1){
                  let pokemon:Pokemon = {
                    id: pkmn.id,
                    name: pkmn.name,
                    image: pkmn.sprites.other['official-artwork'].front_default,
                    mainType: pkmn.types[0].type.name,
                    subType: pkmn.types[1].type.name,
                    hp: pkmn.stats[0].base_stat,
                    atk: pkmn.stats[1].base_stat,
                    def: pkmn.stats[2].base_stat,
                    spAtk: pkmn.stats[3].base_stat,
                    spDef: pkmn.stats[4].base_stat,
                    spd: pkmn.stats[5].base_stat,
                    total: pkmn.stats[0].base_stat+pkmn.stats[1].base_stat+pkmn.stats[2].base_stat+pkmn.stats[3].base_stat+pkmn.stats[4].base_stat+pkmn.stats[5].base_stat
                  }
                if(pokemon.image!=undefined){
                  if(parseInt(pokemon.id)<=151) this._pokemonArrayG1.push(pokemon);
                  else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=251) this._pokemonArrayG2.push(pokemon);
                  else if(parseInt(pokemon.id)>251 && parseInt(pokemon.id)<=386) this._pokemonArrayG3.push(pokemon);
                  else if(parseInt(pokemon.id)>386 && parseInt(pokemon.id)<=493) this._pokemonArrayG4.push(pokemon);
                  else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=649) this._pokemonArrayG5.push(pokemon);
                  else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=721) this._pokemonArrayG6.push(pokemon);
                  else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=809) this._pokemonArrayG7.push(pokemon);
                  else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=910) this._pokemonArrayG8.push(pokemon);
                  else this._pokemonArrayOther.push(pokemon);
                }
                }else{
                  let pokemon:Pokemon = {
                    id: pkmn.id,
                    name: pkmn.name,
                    image: pkmn.sprites.other['official-artwork'].front_default,
                    mainType: pkmn.types[0].type.name,
                    hp: pkmn.stats[0].base_stat,
                    atk: pkmn.stats[1].base_stat,
                    def: pkmn.stats[2].base_stat,
                    spAtk: pkmn.stats[3].base_stat,
                    spDef: pkmn.stats[4].base_stat,
                    spd: pkmn.stats[5].base_stat,
                    total: pkmn.stats[0].base_stat+pkmn.stats[1].base_stat+pkmn.stats[2].base_stat+pkmn.stats[3].base_stat+pkmn.stats[4].base_stat+pkmn.stats[5].base_stat
                  }
                  if(pokemon.image!=undefined){
                    if(parseInt(pokemon.id)<=151) this._pokemonArrayG1.push(pokemon);
                    else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=251) this._pokemonArrayG2.push(pokemon);
                    else if(parseInt(pokemon.id)>251 && parseInt(pokemon.id)<=386) this._pokemonArrayG3.push(pokemon);
                    else if(parseInt(pokemon.id)>386 && parseInt(pokemon.id)<=493) this._pokemonArrayG4.push(pokemon);
                    else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=649) this._pokemonArrayG5.push(pokemon);
                    else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=721) this._pokemonArrayG6.push(pokemon);
                    else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=809) this._pokemonArrayG7.push(pokemon);
                    else if(parseInt(pokemon.id)>151 && parseInt(pokemon.id)<=910) this._pokemonArrayG8.push(pokemon);
                    else this._pokemonArrayOther.push(pokemon);
                  }
                }
              }
            );
            if(this._totalPages == 0) this._totalPages = pkmn.count;
            if(pkmn.next) this._nextPage = pkmn.next.split("=")[1];
            else this._nextPage = this._totalPages+1;
          }
        }
      )
  }
  
  existsMorePokemon():boolean{
    return this._nextPage <= this._totalPages;
  }

  get gen1Pokemon():Pokemon[]{
    return this._pokemonArrayG1.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen2Pokemon():Pokemon[]{
    return this._pokemonArrayG2.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen3Pokemon():Pokemon[]{
    return this._pokemonArrayG3.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen4Pokemon():Pokemon[]{
    return this._pokemonArrayG4.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen5Pokemon():Pokemon[]{
    return this._pokemonArrayG5.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen6Pokemon():Pokemon[]{
    return this._pokemonArrayG6.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen7Pokemon():Pokemon[]{
    return this._pokemonArrayG7.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get gen8Pokemon():Pokemon[]{
    return this._pokemonArrayG8.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }get otherPokemon():Pokemon[]{
    return this._pokemonArrayOther.sort(function(a,b){
      if(a.id>b.id){
        return 1;
      }
      if(a.id<b.id){
        return -1;
      }
      return 0;
    });
  }

  set setMyGeneration(myGen){
    this._myGen = myGen;
  }
  get getMyGeneration():string{
    return this._myGen;
  }

}
