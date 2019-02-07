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
    const OrderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })
    this.list.push(OrderPosition)
  }

  remove() {
 
  }

  clear() {

  }
}
