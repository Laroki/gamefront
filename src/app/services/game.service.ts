import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private http = inject(HttpClient);

  createGame(isPrivate: boolean): Observable<Game> {
    return this.http.post(`${environment.api}/game/create`, { isPrivate }) as Observable<Game>
  }

  joinGame(gameId: string): Observable<Game> {
    return this.http.patch(`${environment.api}/game/${gameId}/join`, {}) as Observable<Game>
  }

  leaveGame(gameId: string): Observable<Game> {
    return this.http.patch(`${environment.api}/game/${gameId}/leave`, {}) as Observable<Game>
  }

  getPublicWaitingGames(): Observable<Game[]> {
    return this.http.get(`${environment.api}/game/public`) as Observable<Game[]>
  }

  getGameById(gameId: string): Observable<Game> {
    return this.http.get(`${environment.api}/game/${gameId}`) as Observable<Game>
  }
}
