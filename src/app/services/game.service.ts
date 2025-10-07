import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Game, PublicGames } from '../interfaces/game.interface';

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

  getPublicWaitingGames(): Observable<PublicGames[]> {
    return this.http.get(`${environment.api}/game/public`) as Observable<PublicGames[]>
  }

  getGameById(gameId: string): Observable<Game> {
    return this.http.get(`${environment.api}/game/${gameId}`) as Observable<Game>
  }

  sendWord(gameId: string, word: string): Observable<Game> {
    return this.http.post(`${environment.api}/game/${gameId}/add-word`, { word }) as Observable<Game>
  }
}
