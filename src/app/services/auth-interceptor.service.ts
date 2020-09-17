import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { SERVER_MESSAGES } from '@app/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    excludeUrls = ['uploadimage', 'import'];
    constructor() { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.checkUrl(request.url)) {
            request = request.clone({
                headers: request.headers
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${environment.adminToken}`)
            });
        }
        else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${environment.adminToken}`
                },
            });
        }



        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error instanceof HttpErrorResponse) {
                    switch ((error as HttpErrorResponse).status) {
                        case 200:
                            if (error.error.text) {
                                errorMessage = `${error.error.text}`;
                            }
                            break;
                        case 500:
                            errorMessage = `${error.error.message}`;
                            break;
                        default:
                            errorMessage = `${error.message}`;
                            // errorMessage = `${error.error.message}`;
                            break;
                    }
                    if (error.status && (error.error.message) !== SERVER_MESSAGES.ALREADY_SUBMITTED &&
                        error.status !== 200) {
                        // this.toastrService.error(errorMessage);
                    }
                }
                // }
                if (error.status && errorMessage) {
                    return throwError(errorMessage);
                }
                return throwError('');
            })
        );
    }

    checkUrl(url: string): boolean {
        for (const excludeString of this.excludeUrls) {
            if (url.indexOf(excludeString) >= 0) {
                return false;
            }
        }
        return true;
    }
}
