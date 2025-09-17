import { Component, inject, input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService)
  private router = inject(Router)

  id = input.required<string>()

  ngOnInit(): void {
    this.gameService.getGameById(this.id()).subscribe({
      next: (res) => console.log(res)
    })
  }

  leaveGame() {
    this.gameService.leaveGame(this.id()).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err) => console.log(err)
    })
  }
}
