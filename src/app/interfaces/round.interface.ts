import { User } from "./user.interface";

export interface Round {
    id: number;
    roundNumber: number;
    words: RoundWord[];
}

export interface RoundWord {
    user: User;
    word: string;
}