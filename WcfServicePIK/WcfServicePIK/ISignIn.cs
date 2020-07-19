using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WcfServicePIK
{
   
    [ServiceContract]
    public interface ISignIn
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "api/IsLoginCorrect/{login}")]
        ResponseLogin IsLoginCorrect(string login);
    }

    [DataContract]
    public class ResponseLogin
    {
        [DataMember]
        public string Success { get; set; }

        [DataMember]
        public string[] Errors { get; set; }
    }
}
