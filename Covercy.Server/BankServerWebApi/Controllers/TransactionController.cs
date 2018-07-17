using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using BankServerWebApi.Code;
namespace BankServerWebApi.Controllers
{
    [CustomExceptionFilter]
    [RoutePrefix("api/transaction")]
    public class TransactionController : ApiController
    {
        public CovercyBankEntities model;

        public TransactionController()
        {
            model = new CovercyBankEntities();
        }

        [Route("getAllTransactions")]
        [HttpGet]
        public IEnumerable<Transaction> getAllTransactions()
        {
            if (model != null)
                return model.getAllTransactions();
            return null;
        }

        [Route("createTransaction")]
        [HttpPost]
        public void createTransaction([FromBody] Transaction transaction)
        {
            if (model == null || transaction == null)
                return;
            else
                 model.insertTransaction(transaction.saleCurrency,
                                               transaction.amount,
                                               transaction.buyCurrency);
        }


    }
}
