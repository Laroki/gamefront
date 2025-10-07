import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { timeAgoPipe } from '../../pipes/time-ago.pipe';
import { ActiveGames, GameVisibility } from '../../interfaces/game.interface';
import { BadgeComponent } from '../../components/badge/badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatInputModule, TitleCasePipe, CommonModule, timeAgoPipe, BadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService)
  private gameService = inject(GameService)
  userService = inject(UserService)
  private router = inject(Router)
  GameVisibility = GameVisibility;

  isPrivate = true;
  gameID = '';
  username = this.userService.getUser()?.username
  activeGames: ActiveGames[] = []
  publicGames$ = this.gameService.getPublicWaitingGames()
  noGameFound = false

  ngOnInit() {
    this.userService.getActiveGames().subscribe(games => {
      this.activeGames = games;
    });
  }


  logout() {
    this.authService.logout()
  }

  createGame() {
    this.gameService.createGame(this.isPrivate).subscribe({
      next: (res) => this.router.navigate(['/game', res.id]),
      error: (err) => console.error('Erreur login:', err)
    })
  }

  joinGameByID(gameId: string) {
    this.noGameFound = false
    this.gameService.joinGame(gameId).subscribe({
      next: (res) => this.router.navigate(['/game', res.id]),
      error: () => this.noGameFound = true
    })
  }

  joinActiveGame(id: string) {
    this.router.navigate(['/game', id])
  }

  leaveGame(gameID: string) {
    this.gameService.leaveGame(gameID).subscribe({
      next: () => this.activeGames = this.activeGames.filter(g => g.id !== gameID)
    })
  }
}
