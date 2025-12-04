import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { PokeService } from './services/poke';
import { HttpErrorResponse } from '@angular/common/http';
import { itemListModel, ListModel, PokemonDetails } from './models/list.model';
import { CommonModule } from '@angular/common';
import { switchMap, map, forkJoin, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {

  public router = inject(Router);
  public pokeService = inject(PokeService);
  
  ngOnInit(): void {
    this.pokeService.loadInitialData();
  }

}
