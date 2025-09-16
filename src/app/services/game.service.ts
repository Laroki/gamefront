import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private http = inject(HttpClient);

  createGame(isPrivate: boolean): Observable<any> {
    return this.http.post(`${environment.api}/game/create`, { isPrivate })
  }

  joinGame(gameID: string): Observable<any> {
    return this.http.patch(`${environment.api}/game/${gameID}/join`, {})
  }
}
