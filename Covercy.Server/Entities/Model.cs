using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    partial class CovercyBankEntities : DbContext
    {
        public CovercyBankEntities(string connString) : base(connString)
        {
        }
    }
}
