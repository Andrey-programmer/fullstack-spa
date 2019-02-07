import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderCompleteService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }
}
