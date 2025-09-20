import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../../services/game.service';

@Injectable({ providedIn: 'root' })
export class GameResolver implements Resolve<any> {
    private gameService = inject(GameService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    resolve(route: ActivatedRouteSnapshot) {
        const gameId = route.params['id'];

        return this.gameService.getGameById(gameId).pipe(
            catchError(() => {
                // Todo: improve snackbar with snackbar service and handle style for error etc...
                this.snackBar.open('Cette partie est privée', 'Fermer', {
                    duration: 5000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    panelClass: ['alert-snackbar']
                });
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
