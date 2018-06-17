import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class NotifierService {

  notifier = new EventEmitter<string>();

  constructor() { }

  notify(){
    this.notifier.emit('success');
  }
}
