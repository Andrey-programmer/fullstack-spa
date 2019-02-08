import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Order } from '../interfaces/interfaces'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class OrderCompleteService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  getOrders(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      }) 
    })
  }
}
