using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Repository;
using System.IO;

namespace DemoProjectWithJquery.Controllers
{
    public class HomeController : Controller
    {
        private DemoContext DC = new DemoContext();
        static string fname;
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(DemoTable dt)
        {
            DC.DemoTables.Add(dt);
            DC.SaveChanges();
            return Json("Ok", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult List()
        {
            List<DemoTable> employeeList = DC.DemoTables.ToList<DemoTable>();
            return Json(employeeList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult Delete(int ID)
        {
            DemoTable dt = DC.DemoTables.Single(m => m.Id == ID);
            DC.DemoTables.Remove(dt);
            DC.SaveChanges();

            return Json("Deleted", JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ID)
        {
            var Data = DC.DemoTables.Single(m => m.Id == ID);
            return Json(Data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(DemoTable emp)
        {
            DC.Entry(emp).State = System.Data.Entity.EntityState.Modified;
            DC.SaveChanges();
            return Json("Ok", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult FetchImage()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[i];
                        string fname;

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                        }

                        // Get the complete folder path and store the file inside it.  
                        fname = Path.Combine(Server.MapPath("~/Uploads/"), fname);
                        file.SaveAs(fname);
                    }
                    // Returns message that successfully uploaded  
                    return Json("File Uploaded Successfully!");
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }
    }
}