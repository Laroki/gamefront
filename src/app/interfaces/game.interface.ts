import { Round } from "./round.interface";
import { User } from "./user.interface";

export interface Game {
    id: string,
    isPrivate: boolean,
    status: GameStatus,
    createdAt: Date,
    player1: User,
    player2?: User,
    abandonedBy: User,
    role?: GameRole,
    rounds?: Round[],
    userSentWord?: boolean
    foundWord?: string;
}

export interface PublicGames {
    id: string;
    createdAt: Date;
    creator: string
}

export interface ActiveGames {
    id: string;
    isPrivate: boolean;
    status: GameStatus;
    createdAt: Date;
    adversaryUsername: string | null
}

export enum GameVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export enum GameRole {
    VIEWER = 'viewer',
    PLAYER = 'player',
    OWNER = 'owner',
}

export enum GameStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in_progress',
    FINISHED = 'finished',
    ABANDONED = 'abandoned',
    WON = 'won'
}