import { Injectable } from '@angular/core';
import { Donut } from '../models/donut';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  catchError,
  delay,
  map,
  of,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    headers.append('api-token', '1234qwer');

    const options = {
      headers,
    };

    return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  readOne(id: string | null) {
    return this.read().pipe(
      map((donuts) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);
        console.log(donut);

        if (donut) {
          return donut;
        }
        return { name: '', icon: '', price: 0, description: '' };
      })
    );
  }

  create(payload: Donut) {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) {
    console.log(payload);
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        (this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === donut.id) {
            return donut;
          }
          return item;
        })),
          catchError(this.handleError);
      })
    );
  }

  delete(payload: Donut) {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap((donut) => {
        this.donuts = this.donuts.filter(
          (item: Donut) => item.id !== payload.id
        );
        console.log('deleted: ', donut);
      })
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client-side
      console.warn('client', err.message);
    } else {
      // server-side
      console.warn('server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
