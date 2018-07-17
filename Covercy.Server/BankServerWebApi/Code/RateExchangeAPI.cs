using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Text;
using System.IO;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using Entities;

namespace BankServerWebApi.Code
{
    public class RateExchangeAPI
    {
        public string hostURL { get; set; }
        public string apiKey { get; set; }

        public string urlconstPrefix { get; set; }

        public RateExchangeAPI()
        {
            this.hostURL = @"http://data.fixer.io/api/latest";
            this.apiKey = "2c686835ed24206a2940b0765bd3105b";
            this.urlconstPrefix = this.hostURL + "?access_key=" + this.apiKey;
        }

        public void getRatingExchange(CurrencyTemplateApi[] exchangeArray, CovercyBankEntities model)
        {

            foreach(CurrencyTemplateApi currCurrency in exchangeArray)
            {
                string requestURL = this.urlconstPrefix + "&base="+ currCurrency.iso;
                string allBuyIsos = "";
                foreach(var buyIso in currCurrency.convertTo)
                {
                    allBuyIsos = allBuyIsos + buyIso.iso + ",";
                }
                allBuyIsos = allBuyIsos.Remove(allBuyIsos.Length - 1);
                requestURL = requestURL + "&symbols=" + allBuyIsos;
                var request = (HttpWebRequest)WebRequest.Create(requestURL);
                var response = (HttpWebResponse)request.GetResponse();
                var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                var serializer = new JavaScriptSerializer();
                dynamic result = serializer.DeserializeObject(responseString);
                if (result["success"] == true && result["rates"] !=null)
                {
                    int i = 0;
                    foreach(var rate in result["rates"])
                    {
                        model.updateCurrencyPairMarketRate(currCurrency.id, currCurrency.convertTo[i].id, rate.Value);
                        i++;   
                    }
                }

            }
            
           
        }
    }

    public class CurrencyTemplateApi
    {
        public int id { get; set; }
        public string iso { get; set; }
        public CurrencyTemplateApi[] convertTo { get; set; }

        public CurrencyTemplateApi()
        {
            
        }
    }
}