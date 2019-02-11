import { ElementRef } from '@angular/core' 

declare var M //Искусственно показываем что переменная М существует
// На самом деле она подключается в main.js библиотекой materialize

export interface ModalOptions {
  open?() : void
  close?() : void
  destroy?() : void
}

export interface TooltipOptions {
  open?() : void
  close?() : void
  destroy?() : void
}

export interface MaterialDatePicker extends ModalOptions {
  date?: Date
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): ModalOptions {
    return M.Modal.init(ref.nativeElement)
  }

  static initialTooltip(ref: ElementRef): TooltipOptions {
    return M.Tooltip.init(ref.nativeElement)
  }

  static initDate(ref: ElementRef, onClose: () => void) {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    })
  }

  static initTapTarget(ref: ElementRef): ModalOptions {
    return M.TapTarget.init(ref.nativeElement)
  }
}
