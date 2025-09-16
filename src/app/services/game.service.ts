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

  joinGame(gameID: string): Observable<Game> {
    return this.http.patch(`${environment.api}/game/${gameID}/join`, {}) as Observable<Game>
  }

  leaveGame(gameID: string): Observable<Game> {
    return this.http.patch(`${environment.api}/game/${gameID}/leave`, {}) as Observable<Game>
  }
}
