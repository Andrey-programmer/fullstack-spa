import { Subscription } from 'rxjs'
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { Chart } from 'chart.js'

import { AnalyticsService } from '../shared/services/analytics.service'
import { AnalyticsPage } from '../shared/interfaces/interfaces'

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
    // График выручки
    const moneyConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    // График заказов
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }


    this.aSub = this.service.getAnalytics()
    .subscribe((data: AnalyticsPage) => {
      // console.log(data)

      moneyConfig.labels = data.chart.map(item => item.label)
      moneyConfig.data = data.chart.map(item => item.money)
      
      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      // **** Money ****
      moneyConfig.labels.push('04.02.2018')
      moneyConfig.labels.push('02.02.2018')
      moneyConfig.data.push(1500)
      moneyConfig.data.push(700)

      // **** Orders ****
      orderConfig.labels.push('04.02.2018')
      orderConfig.labels.push('02.02.2018')
      orderConfig.data.push(8)
      orderConfig.data.push(2)

      const moneyContext = this.moneyRef.nativeElement.getContext('2d')
      moneyContext.canvas.height = '300px'
      moneyContext.canvas.width = '400px'
      const orderContext = this.ordersRef.nativeElement.getContext('2d')
      orderContext.canvas.height = '300px'
      orderContext.canvas.width = '400px'

      this.average = data.average

      new Chart(moneyContext, createChartConfig(moneyConfig))
      new Chart(orderContext, createChartConfig(orderConfig))
      this.pending = false
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}


function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}