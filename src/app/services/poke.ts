import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ItemListWithSprite, ListModel, NameUrlPair, PokemonDetails, TypeListModel, TypeModel } from '../models/list.model';
import { catchError, forkJoin, lastValueFrom, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  public allPokemonList = signal<ItemListWithSprite[]>([]);
  public types = signal<NameUrlPair[]>([]);
  public selectedType = signal<string>('all');
  public isLoading = signal(true);

  public filteredPokemonList = computed(() => {
    const selected = this.selectedType();
    const all = this.allPokemonList();

    if (selected === 'all') {
      return all;
    }
    return all.filter((p) => p.types.includes(selected));
  });

  constructor(private http: HttpClient) {}

  private getInitialList() {
    return this.http.get<ListModel>(`${this.baseUrl}/pokemon?limit=50`);
  }

  private getPokemonDetail(name: string) {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`);
  }

  
  public loadInitialData(): void {
    this.isLoading.set(true);

    this.getInitialList().pipe(
      switchMap(initialList => {
        const detailObservables = initialList.results.map(item =>
          this.getPokemonDetail(item.name).pipe(
            map(details => ({
              name: details.name,
              url: `${this.baseUrl}/pokemon/${details.name}`,
              spriteUrl: details.sprites.front_default,
              types: details.types.map(t => t.type.name),
            } as ItemListWithSprite))
          )
        );
        return forkJoin(detailObservables);
      }),
    ).subscribe({
      next: (pokemonDetails: ItemListWithSprite[]) => {
        this.allPokemonList.set(pokemonDetails);
        this.loadTypes();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar los datos iniciales de Pokémon:', err);
        this.allPokemonList.set([]);
        this.types.set([]);
        this.isLoading.set(false);
      }
    });
  }

  private loadTypes(): void {
    lastValueFrom(
        this.http.get<TypeListModel>(`${this.baseUrl}/type`)
    ).then(typeList => {
        this.types.set([{ name: 'all', url: '' }, ...typeList.results]);
    }).catch(error => {
        console.error('Error al cargar los tipos:', error);
        this.types.set([]);
    }).finally(() => {
        this.isLoading.set(false);
    });
  }

 async getPokemonDetails(name: string): Promise<PokemonDetails> {
    try {
      return await lastValueFrom(
        this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`)
      );
    } catch (error) {
      console.error(`Error al obtener los detalles de ${name}:`, error);
      throw new Error(`Pokémon no encontrado: ${name}`);
    }
  }

  public filterByType(typeName: string): void {
    this.selectedType.set(typeName);
  }
}
