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
    [RoutePrefix("api/currencypair")]
    public class CurrencyPairController : ApiController
    {
        public CovercyBankEntities model;

        public CurrencyPairController()
        {
            model = new CovercyBankEntities();
        }

        [Route("getAllCurrencyPair")]
        [HttpGet]
        public IEnumerable<CurrencyPair> getAllCurrencyPair()
        {
            if (model != null)
                return model.getAllCurrencyPair();
            return null;
        }

        [Route("updateCurrencyPair")]
        [HttpPost]
        public CurrencyPair updateCurrencyPair([FromBody] CurrencyPair currencyPair)
        {
            if (model == null || currencyPair == null)
                return null;
            else
                return model.updateCurrencyPair(currencyPair.saleCurrency,
                                                currencyPair.buyCurrency,
                                                currencyPair.midMarketRate,
                                                currencyPair.display).FirstOrDefault();
        }

        [Route("createCurrencyPair")]
        [HttpPost]
        public CurrencyPair createCurrencyPair([FromBody] CurrencyPair currencyPair)
        {
            if (model == null || currencyPair == null)
                return null;
            else
                return model.createCurrencyPair(currencyPair.saleCurrency,
                                                currencyPair.buyCurrency,
                                                currencyPair.midMarketRate,
                                                currencyPair.display).FirstOrDefault();
        }

        [Route("deleteCurrencyPair")]
        [HttpDelete]
        public void deleteCurrencyPair(int saleCurrency,int buyCurrency)
        {
            if (model != null)
                model.deleteCurrencyPair(saleCurrency, buyCurrency);
        }


        [Route("updateCurrencyRates")]
        [HttpGet]
        public void updateCurrencyRates()
        {
        
            if (model != null)
            {
                List<CurrencyPairsWithIso> all = this.model.getCurrencyPairsWithIso().ToList();
                var t = all.GroupBy(item => item.saleCurrency)
                    .Select(item =>
                            new CurrencyTemplateApi
                            {
                                id = item.Key,
                                iso = item.Select(i => i.isoSale).First(),
                                convertTo = item.Select( i=>
                                    new CurrencyTemplateApi
                                    {
                                        id = i.buyCurrency,
                                        iso = i.isoBuy
                                    } ).ToArray()
                             }
                         
                 ).ToArray();
                RateExchangeAPI exchangeAPI = new RateExchangeAPI();
                exchangeAPI.getRatingExchange(t,model);

                return;
            }

        }

    }
}

