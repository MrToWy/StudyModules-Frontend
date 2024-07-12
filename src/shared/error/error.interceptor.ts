import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.errorService.errors = [];
          }
        },
        error: (error) => {
          if (error.error instanceof ErrorEvent) {
            console.error('Client error:', error.error.message);
          } else {
            console.error('Server error:', error);
            if (error.status === 0) {
              if (this.errorService.errors.length === 0) {
                const error = {
                  severity: 'error',
                  summary: 'Server unreachable',
                  detail: 'The server is unreachable. Please try again later.'
                };
                this.errorService.errors = [...this.errorService.errors, error];
              }
            }
            if (error.status === 401) {
              if (this.errorService.errors.length === 0) {
                const error = {
                  severity: 'error',
                  summary: 'Unauthorized',
                  detail: 'You are not authorized to perform this action. Please logout, login and try again.'
                };
                this.errorService.errors = [...this.errorService.errors, error];
              }
            }
          }
        }
      }),
    );
  }
}
