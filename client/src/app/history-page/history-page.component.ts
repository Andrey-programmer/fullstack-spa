import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { TooltipOptions, MaterialService } from '../shared/services/material.service';
import { OrderCompleteService } from '../shared/services/order-complete.service';
import { Subscription } from 'rxjs';
import { Order } from '../shared/interfaces/interfaces';

const STEP: number = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  isFilterVisible = false
  aSub: Subscription
  tooltip: TooltipOptions
  orders: Order[] = []

  offset: number = 0
  limit: number = STEP

  loading = false
  reloading = false
  
  onMoreOrders = false

  constructor(private ordersServise: OrderCompleteService) { }

  ngOnInit() {
    this.reloading = true
    this.getOrders()
  }

  getOrders() {
    const params = {
      offset: this.offset, 
      limit: this.limit
    }
    this.aSub = this.ordersServise.getOrders(params)
    .subscribe((orders) =>{
      this.orders = this.orders.concat(orders)
      this.onMoreOrders = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.getOrders()
  }

  ngAfterViewInit() {
   this.tooltip = MaterialService.initialTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltip.destroy( )
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
