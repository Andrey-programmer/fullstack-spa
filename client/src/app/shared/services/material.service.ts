import { ElementRef } from '@angular/core';

declare var M //Искусственно показываем что переменная М существует
// На самом деле она подключается в main.js библиотекой materialize

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }
}
