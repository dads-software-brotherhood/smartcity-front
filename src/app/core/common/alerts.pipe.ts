import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { NotificationType } from '../../core/models/notification-type';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'myAlerts'})
@Injectable()
export class AlertsPipe implements PipeTransform {
  transform(notifications: Array<NotificationType>, notificationSearch: string): boolean {
    for (let i = 0; i < notifications.length; i++) {
      if ( notifications[i].id === notificationSearch) {
         return true;
      }
    };
    return false;
  }
}
