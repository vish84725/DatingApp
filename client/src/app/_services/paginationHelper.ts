import { PaginatedResults } from '../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export function getPaginatedResults<T>(url, params, http: HttpClient) {
  const paginatedResults: PaginatedResults<T> = new PaginatedResults<T>();

  return http.get<T>(url, { observe: 'response', params }).pipe(map(response => {
    paginatedResults.result = response.body;
    if (response.headers.get('Pagination') !== null) {
      paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
    }
    return paginatedResults;
  }));
}

export function getPaginationHeaders(pageNumber: number, pageSize: number){
  let params =  new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
