import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { GameSocketService } from '../../services/game.socket.service';
import { Game } from '../../interfaces/game.interface';
import { Round } from '../../interfaces/round.interface';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatSnackBarModule, CommonModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {
  private gameService = inject(GameService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private gameSocketService = inject(GameSocketService)

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;
  game!: Game;
  word = '';
  private gameSub!: Subscription;
  isLoading = false
  lastRound!: Round

  ngOnInit(): void {
    this.game = this.activatedRoute.snapshot.data['game']
    this.gameSocketService.joinGame(this.game.id);
    this.scrollToBottom()
    this.gameSub = this.gameSocketService.onGameStatusUpdate()
      .subscribe(game => {
        this.game = game
        console.log(game)
        this.scrollToBottom()
      });
  }

  joinGame() {
    this.gameService.joinGame(this.game.id).subscribe({
      next: (res) => this.game = res
    })
  }

  leaveGame() {
    this.gameService.leaveGame(this.game.id).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (err) => console.log(err)
    })
  }

  sendWord() {
    this.isLoading = true
    this.gameService.sendWord(this.game.id, this.word).subscribe({
      next: (game) => {
        this.game = game
        this.scrollToBottom()
      },
      error: (err) => console.log(err)
    }).add(() => {
      this.word = ''
      this.isLoading = false
    });
  }

  scrollToBottom() {
    if (this.game.rounds && this.game.rounds.length > 0) {
      setTimeout(() => this.scrollContainer.nativeElement.scrollTo({
        top: this.scrollContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      }), 0)
    }
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
      this.gameSocketService.leaveGame(this.game.id)
    }
  }
}

