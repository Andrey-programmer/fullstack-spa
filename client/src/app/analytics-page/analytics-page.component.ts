import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('money') moneyRef: ElementRef
  @ViewChild('orders') ordersRef: ElementRef

  average: number //средний чек
  pending = true
  aSub: Subscription

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    this.aSub = this.service.getAnalytics()
    .subscribe((data: AnalyticsPage) => {
      // console.log(data)
      this.average = data.average
      this.pending = false
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
