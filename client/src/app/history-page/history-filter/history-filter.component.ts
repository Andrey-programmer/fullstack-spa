import { Component, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core'

import { Filter } from 'src/app/shared/interfaces/interfaces'
import { MaterialService, MaterialDatePicker } from 'src/app/shared/services/material.service'

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {


  @ViewChild('start') startInputRef: ElementRef
  @ViewChild('end') endInputRef: ElementRef
  @Output() onFilter = new EventEmitter<Filter>()

  order: number
  start: MaterialDatePicker
  end: MaterialDatePicker
  isValid = true

 
  constructor() { }

  
  submitFilter() {
    const filter: Filter = {}

    if(this.order) {
      filter.order = this.order
    }

    if (this.start.date) {
      filter.start = this.start.date
    }

    if (this.end.date) {
      filter.start = this.start.date
    }

    this.onFilter.emit(filter)
  }
  
  validate() {
    if(!this.start.date || !this.end.date) {
      this.isValid = true
      return
    }

    this.isValid = this.start.date < this.end.date
  }

  ngAfterViewInit(): void {
    this.start = MaterialService.initDate(this.startInputRef, this.validate.bind(this))
    this.end = MaterialService.initDate(this.endInputRef, this.validate.bind(this))
  }

  ngOnDestroy(): void {
    this.start.destroy()
    this.end.destroy() 
  }

}
