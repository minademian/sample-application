import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

import { Row } from '../models/row.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Row[]> {
    return this.http.get<Row[]>('/api/data').pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  private handleError(error: Response) {
    return throwError(error.statusText)
  }
}
