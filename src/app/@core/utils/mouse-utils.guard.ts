import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MouseUtilsGuard {
  static lastClickTime: number = 0;

  static isDoubleClick(): boolean {

    let dc: boolean = false;

    if (MouseUtilsGuard.lastClickTime === 0) {
      MouseUtilsGuard.lastClickTime = new Date().getTime();
    } else {
      dc = ( ((new Date().getTime()) - MouseUtilsGuard.lastClickTime) < 400);
      MouseUtilsGuard.lastClickTime = 0;
    }

    return dc;
  }
}
