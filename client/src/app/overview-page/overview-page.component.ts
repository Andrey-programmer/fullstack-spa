import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'

import { AnalyticsService } from '../shared/services/analytics.service'
import { OverviewPage } from '../shared/interfaces/interfaces'
import { ModalOptions, MaterialService } from '../shared/services/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})

export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: ModalOptions
  data$: Observable<OverviewPage>
  yesterday = new Date()

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverview() 
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  openInfo() {
    this.tapTarget.open()
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy()
  }
}
 