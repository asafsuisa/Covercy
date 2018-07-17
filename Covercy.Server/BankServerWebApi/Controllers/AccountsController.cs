using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
namespace BankServerWebApi.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        public CovercyBankEntities model;

        public AccountsController()
        {
            model = new CovercyBankEntities();
        }

        [Route("getAllAccounts")]
        [HttpGet]
        public IEnumerable<BankAccount> getAllAccounts()
        {
            if (model != null)
                return model.getAllBankAccounts();
            return null;
        }

        [Route("updateBankAccount")]
        [HttpPost]
        public BankAccount updateBankAccount([FromBody] BankAccount bankAccount)
        {
            if (model == null || bankAccount == null)
                return null;
            else
                return model.updateBankAccount(bankAccount.accountID,
                                               bankAccount.name,
                                               bankAccount.balance,
                                               bankAccount.currency).FirstOrDefault();
        }

        [Route("createBankAccount")]
        [HttpPost]
        public BankAccount createBankAccount([FromBody] BankAccount bankAccount)
        {
            if (model == null || bankAccount == null)
                return null;
            else
                return model.createBankAccount(bankAccount.name,
                                               bankAccount.balance,
                                               bankAccount.currency).FirstOrDefault();
        }

        [Route("deleteBankAccount")]
        [HttpDelete]
        public void deleteBankAccount(int accountId)
        {
            if (model != null)
                model.deleteBankAccount(accountId);
        }

        [Route("checkAmount")]
        [HttpGet]
        public BankAccount checkAmount(int currencyid)
        {

            if (model == null)
                return null;
            else
                return this.model.getCurrencyAmount(currencyid).FirstOrDefault();
        }


    }
}
