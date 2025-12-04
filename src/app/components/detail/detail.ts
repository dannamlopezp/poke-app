import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokemonDetails } from '../../models/list.model';
import { PokeService } from '../../services/poke';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokeService = inject(PokeService);

  public pokemonName = signal<string>('');
  public pokemonDetails = signal<PokemonDetails | null>(null);
  public isLoading = signal(false);
  public errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name) {
        this.pokemonName.set(name);
        this.loadDetails(name);
      } else {
        this.errorMessage.set('Nombre de Pokémon no proporcionado.');
      }
    });
  }

  async loadDetails(name: string) {
    this.isLoading.set(true);
    this.pokemonDetails.set(null);
    this.errorMessage.set(null);

    try {
      const details = await this.pokeService.getPokemonDetails(name);
      this.pokemonDetails.set(details);
    } catch (error: any) {
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  public formatAbilityName(name: string): string {
    if (!name) return '';
    const formatted = name.replace(/-/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}