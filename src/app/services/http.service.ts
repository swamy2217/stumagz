import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import Config from '../app.config';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private baseUrl = environment.BASE_URL;
    private accessToken: string;

    constructor(private http: HttpClient, private router: Router) { }

    private handleError(e) {
        console.log(e);
        return e;
    }

    get(url: string, otherHost?: 'authApi'): Observable<any> {
        const result = this.http.get<any>(this.baseUrl + url).pipe(
            tap(
                (res) => res,
                (err) => this.handleError(err)
            )
        );

        return result;
    }

    post(url: string, data, otherHost?: 'authApi'): Observable<any> {
        const result = this.http.post(this.baseUrl + url, data).pipe(
            tap(
                (res) => res,
                (err) => this.handleError(err)
            )
        );

        return result;
    }

    uploadFile(file: File): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('img ', file);
        return this.http.post(this.baseUrl + 'api/uploadimage', formdata);
    }
    uploadQuestionsFile(file: File): Observable<any> {
        const formdata: FormData = new FormData();
        formdata.append('excel ', file);
        return this.http.post(this.baseUrl + 'api/import', formdata);
    }
}
