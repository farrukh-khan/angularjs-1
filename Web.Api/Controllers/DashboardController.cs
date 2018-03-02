using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;
using Microsoft.Office.Interop.Excel;
using System.Data.OleDb;
namespace Web.Api.Controllers
{
    public class DashboardController : ApiController
    {

        #region Fields
        //private readonly ISpService _spService;

        #endregion

        #region Ctor
        public DashboardController()
        {
            // _spService = StructureMap.ObjectFactory.GetInstance<ISpService>();

        }
        #endregion

        #region Api Controllers

        [HttpGet]

        [ActionName("GetDashboard")]

        public IHttpActionResult GetDashboard()
        {
            try
            {

                //SqlParameter[] param = {
                //                        new SqlParameter("@iCustomer",iCustomer),                                        
                //                       };

                //DataSet data = _spService.ExcuteSpAnonmious("prc_dashboard", param, 3);
                return Ok();
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
        }


        public IHttpActionResult GetMembers()
        {
            try
            {


                System.Data.DataTable dt = new System.Data.DataTable();
                string con =
    @"Provider=Microsoft.Jet.OLEDB.4.0;Data Source=E:\Git\Itapx\povertybank.prototype\Web.Api\Database\final_1.xls;" +
    @"Extended Properties='Excel 8.0;HDR=Yes;'";
                
                System.Data.DataTable results = new System.Data.DataTable();

                using (OleDbConnection conn = new OleDbConnection(con))
                {
                    OleDbCommand cmd = new OleDbCommand("select * from [level 2]", conn);

                    conn.Open();

                    OleDbDataAdapter adapter = new OleDbDataAdapter(cmd);

                    adapter.Fill(results);
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
        }







        #endregion
    }
}

