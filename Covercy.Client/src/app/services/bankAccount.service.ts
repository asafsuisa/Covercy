import { Injectable,Injector } from '@angular/core';
import {Observable}  from 'rxjs';
import {ConfigService,GlobalServiceConfiguration} from './services';
import { HttpClient,HttpParams } from '@angular/common/http';
import {BankAccount} from '../models/bankAccount';

@Injectable()
export class BankAccountService extends ConfigService{
    constructor(globalServiceConfiguration:GlobalServiceConfiguration)
    {
        super("accounts",globalServiceConfiguration);
    }

    getAllAccounts() :Observable<BankAccount[]>
    {
        return this.getImp<BankAccount[]>("getAllAccounts");
    }

    updateBankAccout(value:BankAccount) :Observable<BankAccount>
    {
        return this.postImp<BankAccount>("updateBankAccount",value);
    }
    createBankAccout(value:BankAccount) :Observable<BankAccount>
    {
        return this.postImp<BankAccount>("createBankAccount",value);
    }


    deleteBankAccout(accountID:number) :Observable<void>
    {
        let searchParams = new HttpParams().set("accountId",accountID.toString());
        return this.deleteImp<BankAccount>("deleteBankAccount",searchParams);
    }

    checkAmount(currencyId:number):Observable<BankAccount>
    {
        let searchParams = new HttpParams().set("currencyId",currencyId.toString());
        return this.getImp<BankAccount>("checkAmount",searchParams);
    }

}