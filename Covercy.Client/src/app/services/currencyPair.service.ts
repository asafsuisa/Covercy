import { Injectable,Injector } from '@angular/core';
import {Observable}  from 'rxjs';
import {ConfigService,GlobalServiceConfiguration} from './services';
import { HttpClient,HttpParams } from '@angular/common/http';
import {CurrencyPair} from '../models/currencyPair';
@Injectable()
export class CurrencyPairService extends ConfigService{
    constructor(globalServiceConfiguration:GlobalServiceConfiguration)
    {
        super("currencyPair",globalServiceConfiguration);
    }

    getAllCurrencyPair() :Observable<CurrencyPair[]>
    {
        return this.getImp<CurrencyPair[]>("getAllCurrencyPair");
    }

    updateCurrencyPair(value:CurrencyPair) :Observable<CurrencyPair>
    {
        return this.postImp<CurrencyPair>("updateCurrencyPair",value);
    }
    createCurrencyPair(value:CurrencyPair) :Observable<CurrencyPair>
    {
        return this.postImp<CurrencyPair>("createCurrencyPair",value);
    }

    deleteCurrencyPair(saleCurrency:number,buyCurrency:number) :Observable<void>
    {
        let searchParams = new HttpParams().set("saleCurrency",saleCurrency.toString())
        .set("buyCurrency",buyCurrency.toString());
        return this.deleteImp<CurrencyPair>("deleteCurrencyPair",searchParams);
    }

    updateCurrencyPairRates() :Observable<void>
    {
            return this.getImp<void>("updateCurrencyRates");
    }



}