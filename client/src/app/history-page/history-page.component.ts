import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { TooltipOptions, MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  isFilterVisible = false
  tooltip: TooltipOptions

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.tooltip = MaterialService.initialTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltip.destroy()
  }

}
