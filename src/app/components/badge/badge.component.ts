import { Component, Input } from '@angular/core';
import { GameStatus, GameVisibility } from '../../interfaces/game.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() status!: GameStatus | GameVisibility;
  GameVisibility = GameVisibility;
  GameStatus = GameStatus;

  statusMapper: Record<GameStatus | GameVisibility, string> = {
    [GameStatus.IN_PROGRESS]: '🎮 En cours',
    [GameStatus.WAITING]: '⏳ En attente',
    [GameStatus.FINISHED]: '✅ Terminé',
    [GameStatus.ABANDONED]: '❌ Abandonné',
    [GameStatus.WON]: '🏆 Gagné',
    [GameVisibility.PRIVATE]: '🔒 Privé',
    [GameVisibility.PUBLIC]: '🌍 Public',
  }
}
