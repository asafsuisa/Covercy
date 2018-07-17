import { Injectable,Injector } from '@angular/core';
import {Observable}  from 'rxjs';
import {ConfigService,GlobalServiceConfiguration} from './services';
import { HttpClient,HttpParams } from '@angular/common/http';
import {Transaction} from '../models/transaction';

@Injectable()
export class TransactionService extends ConfigService{
    constructor(globalServiceConfiguration:GlobalServiceConfiguration)
    {
        super("transaction",globalServiceConfiguration);
    }

    getAllTransactions() :Observable<Transaction[]>
    {
        return this.getImp<Transaction[]>("getAllTransactions");
    }
    createTransaction(value:Transaction) :Observable<Transaction>
    {
        return this.postImp<Transaction>("createTransaction",value);
    }

}