import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    private readonly token: string;

    constructor() {
        this.token = localStorage.getItem('token')??"";
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("intercepted");
        if (this.token) {
            const newRequest = req.clone({
                setHeaders: {
                    'Authorization': "Bearer " + this.token
                }
            });
            return next.handle(newRequest);
        }
        return next.handle(req);
    }
}
