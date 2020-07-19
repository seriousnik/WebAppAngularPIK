using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Text.RegularExpressions;

namespace WcfServicePIK
{
    public class SignIn : ISignIn
    {
        private Regex regSymb = new Regex(@"\W");
        private Regex reg = new Regex(@"(?i)[^a-z0-9\W]");
        public ResponseLogin IsLoginCorrect(string login)
        {
            if (new string[] { "pikuser", "guestuser" }.Contains(login))
                return new ResponseLogin() { Success = "Успех" };
            else
            {
                var listErrors = new List<string>();
                if (regSymb.Match(login).Success)
                    listErrors.Add("Нельзя использовать символы");
                if (reg.Match(login).Success)
                    listErrors.Add("Допустимо использовать только латиницу");
                if (listErrors.Count == 0)
                    listErrors.Add("Логин не найден");
                return new ResponseLogin() { Errors = listErrors.ToArray() };
            }
        }
    }
} 
