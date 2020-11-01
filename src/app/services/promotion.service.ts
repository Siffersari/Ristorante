import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';


import { Promotion } from '../shared/promotion';
import { baseURL } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
  ) {}

  getPromotions(): Observable<Promotion[]> {
    return this.http
    .get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
    .get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  };

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
    .get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map((dishes) => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
