import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LanguageInterceptor implements HttpInterceptor {

    private readonly language: string;

    constructor() {
        this.language = localStorage.getItem('language')??"de";
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("language intercepted");
        if (this.language) {
            const newRequest = req.clone({
                setHeaders: {
                    'language': this.language
                }
            });
            return next.handle(newRequest);
        }
        return next.handle(req);
    }
}
