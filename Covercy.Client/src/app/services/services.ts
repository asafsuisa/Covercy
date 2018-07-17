import { Injectable,Injector } from '@angular/core';
import { HttpClient,HttpParams,HttpResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
@Injectable()

export class GlobalServiceConfiguration{
    constructor (public http: HttpClient,public snackBar:MatSnackBar ){}
}

export class ConfigService {

  completeUrl:string;
  protected http:HttpClient;

  constructor(public extURl:string,protected config: GlobalServiceConfiguration) { 
      this.completeUrl = environment.baseURL + extURl +"/";
      this.http = config.http;
      this.handleError = this.handleError.bind(this);
  }

  getImp<V>(ext:string,search?:HttpParams |{[param: string]: string | string[];}) :Observable<V>
  {
      if (!search) search = new HttpParams();
      
      return this.http.get<V>(this.completeUrl+ext,{params:search}).pipe(catchError(this.handleError))
  }
  postImp<V>(ext:string,value?:V,search?:HttpParams | {[param: string]: string | string[];} ) :Observable<V>
  {
      if (!search) search = new HttpParams();
      
      return this.http.post<V>(this.completeUrl+ext,value,{params:search}).pipe(catchError(this.handleError))
  }

  deleteImp<V>(ext:string,search?:HttpParams | {[param: string]: string | string[];}) :Observable<void>
  {
      if (!search) search = new HttpParams();
      return this.http.delete<void>(this.completeUrl+ext,{params:search}).pipe(catchError(this.handleError))
  }

  protected handleError(error: HttpResponse<any> | any )
  {
    let message:string;

    if (error instanceof HttpResponse) 
    {
        let body = error.body
        if (body.message)
            {
             message = body.message 
            }
        else
            {
                message = "Global error"
            }
    }
        else
            {
                message = error.message || error.toString();
            }
            if(this.config.snackBar)
            {
                this.config.snackBar.open(message,"\u00d7",{duration:6000})
            }
 

    return throwError(error);
  }

}