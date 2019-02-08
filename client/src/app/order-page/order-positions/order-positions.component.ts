import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap, map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Position } from 'src/app/shared/interfaces/interfaces'
import { PositionsService } from 'src/app/shared/services/positions.service'
import { OrderService } from 'src/app/shared/services/order.service'
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private positionsService: PositionsService,
    private orderService: OrderService) { }

  positions$: Observable<Position[]>
  ngOnInit() {
    this.positions$ = this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.getAllPositions(params['id'])
        }
      ),
      map(
        (positions: Position []) => {
          return positions.map( 
            (position) => {
              position.quantity = 1
              return position
            }
          )
        }
      )
    )
    
  }


  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено ${position.quantity} шт`)
    this.orderService.add(position)
  }



}
