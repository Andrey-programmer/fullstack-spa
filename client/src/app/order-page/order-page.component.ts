import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService, ModalOptions } from '../shared/services/material.service';
import { OrderService } from '../shared/services/order.service';
import { OrderPosition } from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  isRoot: boolean
  modal: ModalOptions

  constructor(private router: Router, private order: OrderService) { }

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
    this.modal.close()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()  
  }

}
