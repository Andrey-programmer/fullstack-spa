declare var M //Искусственно показываем что переменная М существует
// На самом деле она подключается в main.js библиотекой materialize

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }
  constructor() { }
}
