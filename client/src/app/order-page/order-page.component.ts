import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { MaterialService, ModalOptions } from '../shared/services/material.service'
import { OrderService } from '../shared/services/order.service'
import { OrderPosition, Order } from '../shared/interfaces/interfaces'
import { OrderCompleteService } from '../shared/services/order-complete.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  isRoot: boolean
  modal: ModalOptions
  loading: boolean = false
  aSub: Subscription

  constructor(
    private router: Router, 
    private order: OrderService,
    private orderComplete: OrderCompleteService
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  modalOpen() {
    this.modal.open()
  }

  modalCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.loading = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.aSub = this.orderComplete.createOrder(order)
    .subscribe(
      (newOrder) => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен`)
        this.order.clear()
      }, 
      error  => {  
        MaterialService.toast(error.error.message)
      },
      () => {
        this.modal.close()
        this.loading = false
      }
    )
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()  
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
