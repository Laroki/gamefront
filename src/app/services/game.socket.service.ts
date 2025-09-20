import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class GameSocketService {
    private socket: Socket;
    private userService = inject(UserService);

    userId = this.userService.getUser()!.id

    constructor() {
        this.socket = io(environment.api);
    }

    joinGame(gameId: string) {
        this.socket.emit('joinGame', { gameId, userId: this.userId });
    }

    leaveGame(gameId: string) {
        this.socket.emit('leaveGame', { gameId, userId: this.userId });
    }

    onGameStatusUpdate(): Observable<Game> {
        return new Observable(observer => {
            this.socket.on('gameStatusUpdate', (data) => {
                observer.next(data.game);
            });
        });
    }
}