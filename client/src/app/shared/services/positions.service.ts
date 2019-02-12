import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Position, Message } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  getAllPositions(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`/api/position/`, position)
  }

  // Тут прописываю any так как почему то возвращается объект Position 
  // а должно быть <Position> (сама позиция)
  updatePosition(position: Position): Observable<any> {
    return this.http.patch<any>(`/api/position/${position._id}`, position)
  }

  deletePosition(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`)
  }
}
