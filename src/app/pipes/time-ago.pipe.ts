import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class timeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    if (diffMinutes < 1) {
      return '1m';
    }
    if (diffMinutes < 10) {
      return `${diffMinutes}m`;
    }
    return '+10m';
  }
}
