import { Injectable,Injector } from '@angular/core';
import {Observable}  from 'rxjs';
import {ConfigService,GlobalServiceConfiguration} from './services';
import { HttpClient,HttpParams } from '@angular/common/http';
import {Currency} from '../models/currency';

@Injectable()
export class CurrencyService extends ConfigService{
    constructor(globalServiceConfiguration:GlobalServiceConfiguration)
    {
        super("currency",globalServiceConfiguration);
    }

    getAllCurrency() :Observable<Currency[]>
    {
        return this.getImp<Currency[]>("getAllCurrency");
    }

    updateCurrency(value:Currency) :Observable<Currency>
    {
        return this.postImp<Currency>("updateCurrency",value);
    }
    createCurrency(value:Currency) :Observable<Currency>
    {
        return this.postImp<Currency>("createCurrency",value);
    }

    deleteCurrency(currencyID:number) :Observable<void>
    {
        let searchParams = new HttpParams().set("currencyId",currencyID.toString());
        return this.deleteImp<Currency>("deleteCurrency",searchParams);
    }

}