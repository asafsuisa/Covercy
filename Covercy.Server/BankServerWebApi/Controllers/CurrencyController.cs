using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
namespace BankServerWebApi.Controllers
{
    [RoutePrefix("api/currency")]
    public class CurrencyController : ApiController
    {
        public CovercyBankEntities model;

        public CurrencyController()
        {
            model = new CovercyBankEntities();
        }

        [Route("getAllCurrency")]
        [HttpGet]
        public IEnumerable<Currency> getAllCurrency()
        {
            if (model != null)
                return model.getAllCurrency();
            return null;
        }

        [Route("updateCurrency")]
        [HttpPost]
        public Currency updateCurrency([FromBody] Currency currency)
        {
            if (model == null || currency == null)
                return null;
            else
                return model.updateCurrency(currency.currencyID,
                                               currency.name,
                                               currency.symbol,
                                               currency.iso).FirstOrDefault();
        }

        [Route("createCurrency")]
        [HttpPost]
        public Currency createCurrency([FromBody] Currency currency)
        {
            if (model == null || currency == null)
                return null;
            else
                return model.createCurrency(currency.name,
                                            currency.symbol,
                                            currency.iso).FirstOrDefault();
        }

        [Route("deleteCurrency")]
        [HttpDelete]
        public void deleteCurrency(int currencyID)
        {
            if (model != null)
                model.deleteCurrency(currencyID);
        }

    }
}
