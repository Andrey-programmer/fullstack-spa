import { Injectable } from '@angular/core'

import { Position, OrderPosition } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  constructor() { }

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.list.find(pos => pos._id === orderPosition._id)

    if (candidate) {
      //если позиция повторяется то изменяем количество
      candidate.quantity += orderPosition.quantity
    } else {
      // иначе добавляем новую позицию в список
      this.list.push(orderPosition)
    }

    this.computePrice()

  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

  remove(orderPosition: OrderPosition) {
    const index = this.list.findIndex(pos => pos._id === orderPosition._id)
    this.list.splice(index, 1)
    this.computePrice()
  }

  clear() {
    this.list = []
    this.price = 0
  }
}
