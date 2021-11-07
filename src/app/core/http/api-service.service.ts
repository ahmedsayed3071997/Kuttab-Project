import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, last, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // https://elkotobback.pithsoft.com/api/
   public base = 'http://elkotobback.pithsoft.com/api/';
  constructor(private http: HttpClient,
     private router: Router,private toastrService:ToastrService) { }
  // Api Get
  getData<T>(
    apiRoute: string,
    urlParams: any = {},
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
  //  headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang);
    if (withToken) {
      const token = localStorage.getItem('token');

      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http
      .get<T>(this.base + apiRoute, {
        headers,
        params: urlParams,
        withCredentials: withToken, // withCred makes sure Authorization headers are sent as well
      })
      .pipe(
        take(1),
        catchError((err) => {          
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                console.log(obj[prop]);
                this.toastrService.error(obj[prop])
            }
        }

          if (err.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
          }
          return throwError(err);
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }


   progressCount = new BehaviorSubject<number>(0);
  // Api Post
  postData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
    customHeaders?: any,
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
   // headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang)
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        const value = customHeaders[key];
        if (value == null) {
          // notice how I am using == here for type coercion
          headers = headers.delete(key); // delete the header if we specified it as null or undefined
        } else {
          headers = headers.set(key, value); // otherwise overwrite the header value even if set before
        }
      });
    }

    const req = new HttpRequest('POST', this.base + apiRoute, data, {
      headers,
      withCredentials: withToken,
    });
    this.toastrService.clear();
      return this.http.request<any>(req).pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event;
          }
          return null;
        }),
        last(),
        map((res:any) => {
          console.log(res);
          
          if(res?.body?.message){this.toastrService.success(res.body.message)}
          return {
            status: res,
            ...res.body,
          };
        }),
        catchError((err) => {
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                console.log(obj[prop]);
                this.toastrService.error(obj[prop])
            }
        }
          if(err?.error?.message){this.toastrService.error(err.error.message)}
          if (err.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
          }
          return throwError({
            error:err.error
          });
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }


  deleteData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
    customHeaders?: any,
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
   // headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang)
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        const value = customHeaders[key];
        if (value == null) {
          // notice how I am using == here for type coercion
          headers = headers.delete(key); // delete the header if we specified it as null or undefined
        } else {
          headers = headers.set(key, value); // otherwise overwrite the header value even if set before
        }
      });
    }

    const req = new HttpRequest('Delete', this.base + apiRoute, data, {
      headers,
      withCredentials: withToken,
    });

      return this.http.request<any>(req).pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event;
          }
          return null;
        }),
        last(),
        map((res:any) => {
          if(res?.body?.message){this.toastrService.success(res.body.message)}
          return {
            status: res,
            ...res.body,
          };
        }),
        catchError((err) => {
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                console.log(obj[prop]);
                this.toastrService.error(obj[prop])
            }
        }
          if(err?.error?.message){this.toastrService.error(err.error.message)}
          if (err.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
          }
          return throwError({
            error:err.error
          });
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }

  patchData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
    customHeaders?: any,
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
   // headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang)
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        const value = customHeaders[key];
        if (value == null) {
          // notice how I am using == here for type coercion
          headers = headers.delete(key); // delete the header if we specified it as null or undefined
        } else {
          headers = headers.set(key, value); // otherwise overwrite the header value even if set before
        }
      });
    }

    const req = new HttpRequest('PATCH', this.base + apiRoute, data, {
      headers,
      withCredentials: withToken,
    });

      return this.http.request<any>(req).pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event;
          }
          return null;
        }),
        last(),
        map((res:any) => {
          if(res?.body?.message){this.toastrService.success(res.body.message)}
          return {
            status: res,
            ...res.body,
          };
        }),
        catchError((err) => {
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                console.log(obj[prop]);
                this.toastrService.error(obj[prop])
            }
        }
          if(err?.error?.message){this.toastrService.error(err.error.message)}
          if (err.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
          }
          return throwError({
            error:err.error
          });
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }
  putData<T>(
    apiRoute: string,
    data: any,
    withToken: boolean = true,
    loadingSnipper:boolean = false,
    componentSnipper:string = '',
    customHeaders?: any,
  ): Observable<T> {
    if(loadingSnipper){
    //  this.spinner.show();
    }
    if(componentSnipper){
    //  this.ngxService.startLoader(componentSnipper);
    }
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
   // headers = headers.append('content-language',this.languageService.currentLanguage$.getValue().lang)
    if (withToken) {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        const value = customHeaders[key];
        if (value == null) {
          // notice how I am using == here for type coercion
          headers = headers.delete(key); // delete the header if we specified it as null or undefined
        } else {
          headers = headers.set(key, value); // otherwise overwrite the header value even if set before
        }
      });
    }

    const req = new HttpRequest('PUT', this.base + apiRoute, data, {
      headers,
      withCredentials: withToken,
    });

      return this.http.request<any>(req).pipe(
        map((event) => {
          if (event.type === HttpEventType.Response) {
            return event;
          }
          return null;
        }),
        last(),
        map((res:any) => {
          if(res?.body?.message){this.toastrService.success(res.body.message)}
          return {
            status: res,
            ...res.body,
          };
        }),
        catchError((err) => {
          for (var key in err.error.errors) {
            if (!err.error.errors.hasOwnProperty(key)) continue;
            var obj = err.error.errors[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                console.log(obj[prop]);
                this.toastrService.error(obj[prop])
            }
        }
          if (err.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem('user');
            this.router.navigate(['/auth']);
          }
          return throwError({
            error:err.error
          });
        }),
        finalize(() => {
          if(loadingSnipper){
          //  this.spinner.hide();
          }
          if(componentSnipper){
          //  this.ngxService.stopLoader(componentSnipper);
          }
        })
      );
  }
}
