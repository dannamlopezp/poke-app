import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PokeService } from '../../services/poke';
import { CommonModule } from '@angular/common';
import { ItemListWithSprite, NameUrlPair } from '../../models/list.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public pokeService = inject(PokeService);
  private router = inject(Router);

  goToDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }

  onTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pokeService.filterByType(selectElement.value);
  }
  
  trackByType(index: number, item: NameUrlPair): string {
    return item.name;
  }

  trackByPoke(index: number, item: ItemListWithSprite): string {
    return item.name;
  }
}
