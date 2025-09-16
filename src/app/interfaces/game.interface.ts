import { User } from "./user.interface";

export interface Game {
    id: string,
    isPrivate: boolean,
    status: GameStatus,
    createdAt: Date,
    player1: User,
    player2?: User,
    abandonedBy: User
}

export enum GameStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in_progress',
    FINISHED = 'finished',
    ABANDONED = 'abandoned',
}