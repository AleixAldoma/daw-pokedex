import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Pokemon } from 'src/app/models/pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  private _idx: number = -1;
  public pokemon: Pokemon;
  private customTheme: any = localStorage.getItem("customTheme");

  constructor(private activatedRoute: ActivatedRoute, private pokedexService: PokedexService) {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this._idx = params['id'];
        if(this.pokedexService.getMyGeneration=="gen1") this.pokemon=this.pokedexService.gen1Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen2") this.pokemon=this.pokedexService.gen2Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen3") this.pokemon=this.pokedexService.gen3Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen4") this.pokemon=this.pokedexService.gen4Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen5") this.pokemon=this.pokedexService.gen5Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen6") this.pokemon=this.pokedexService.gen6Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen7") this.pokemon=this.pokedexService.gen7Pokemon[this._idx];
        else if(this.pokedexService.getMyGeneration=="gen8") this.pokemon=this.pokedexService.gen8Pokemon[this._idx];
        else this.pokemon=this.pokedexService.otherPokemon[this._idx];
        console.log(this.pokemon.name+" "+this.pokedexService.getMyGeneration);
        setTimeout(() => {
          if(this.customTheme) document.body.setAttribute('pokeTheme',this.pokemon.mainType);
        }, 95);
      } 
    );
    if(localStorage.getItem('customTheme')) this.customTheme=JSON.parse(localStorage.getItem("customTheme"));
    else this.customTheme = true;
  }

  ngOnInit() {
  }

  switchTheme(){
    if(this.customTheme){
      this.customTheme = false;
      localStorage.setItem("customTheme", JSON.stringify(false));
      document.body.removeAttribute('pokeTheme');
    }else{
      this.customTheme = true;
      localStorage.setItem("customTheme", JSON.stringify(true));
      document.body.setAttribute('pokeTheme',this.pokemon.mainType);
    }
  }

}
