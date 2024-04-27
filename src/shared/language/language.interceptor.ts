import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LanguageService} from "./language.service";

@Injectable({
    providedIn: 'root'
})
export class LanguageInterceptor implements HttpInterceptor {

    private language: string;

    constructor(private languageService: LanguageService) {
        this.language = this.languageService.languageCode;
        this.languageService.languageSubject.subscribe((language) => {
            this.language = language;
        });
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
