import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';


import { Leader } from './../shared/leader';
import { baseURL } from './../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(private http: HttpClient, private processHttpMsgService: ProcessHTTPMsgService) {}

  getLeaders(): Observable<Leader[]> {
    return this.http
    .get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError((this.processHttpMsgService.handleError)));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http
    .get<Leader>(baseURL + 'leadership?featured=true')
    .pipe(map((leaders) => leaders[0]))
    .pipe(catchError((this.processHttpMsgService.handleError)));
  }
}
