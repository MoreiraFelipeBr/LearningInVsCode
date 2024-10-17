var domain = 'https://app.gomarketplan.io/';
var has_clicked = false;

var marketplan = marketplan || (function () {
    var _settings = []; // private
    return {
        init: function (settings) {
            _settings = settings;

            var ref = encodeURIComponent(document.referrer);
            if (settings.mprefoverwrite) {
                ref = encodeURIComponent(settings.mprefoverwrite);
            }
            document.addEventListener('click', function (e) {

                if (e.target && ((e.target.nodeName && e.target.nodeName.toLowerCase() == "a") || (e.target.parentNode.className && e.target.parentNode.className.toLowerCase().includes("btn")) || (e.target.className && e.target.className.toLowerCase().includes("btn")) || (e.target.nodeName && e.target.nodeName.toLowerCase() == "button") || (e.target && e.target.type && (e.target.type == 'submit' || e.target.type == 'button' || e.target.type == 'button')))) {

                    has_clicked = true;
                    var inputs = document.getElementsByTagName('input');
                    var f1 = "";
                    var f2 = "";
                    var found_email_field = false;


                    for (var i = 0; i < inputs.length; i += 1) {
                        if (inputs[i].name.includes("email") && validateEmail(inputs[i].value) && (inputs[i].type == "text" || inputs[i].type == "email") && inputs[i].value.includes("@")) {
                            f1 = inputs[i].value;
                            found_email_field = true;
                            break;
                        }
                        if ((inputs[i].type == "text" || inputs[i].type == "email") && inputs[i].value.includes("@") && validateEmail(inputs[i].value)) {
                            f2 = inputs[i].value;
                            break;
                        }
                    }

                    if (found_email_field || f2 != "") {
                        var xmlhttp2 = new XMLHttpRequest();
                        xmlhttp2.onreadystatechange = function () {
                            if (xmlhttp2.readyState == XMLHttpRequest.DONE) {
                                if (xmlhttp2.status == 200) {
                                    //                          var responseJSON = JSON.parse(xmlhttp.responseText);
                                }
                            }
                        };
                        xmlhttp2.open("GET", domain + 'whprepare.php?pid=' + settings.mpid + '&mpageid=' + settings.mpageid + '&user=' + settings.muser + '&ref=' + ref + '&jsurl=' + encodeURIComponent(window.location.href) + "&email=" + encodeURIComponent((f1.length > 0 ? f1 : f2)), true);
                        xmlhttp2.send();
                    }
                }

                /*                if (e.target.name && e.target.name.includes("submit")) {
                                    getIP();                
                                }
                                if (e.target.className && e.target.className.includes("submit")) {
                                    getIP();
                                }
                                if (e.target.type && e.target.type.includes("submit")) {
                                    getIP();
                                } */
            });
            /*
                        function getIP() {
                            var ipdata = new XMLHttpRequest();
                            ipdata.open("GET", 'https://app.gomarketplan.io/getip.php', false);
                            ipdata.send();
                            var ip = ipdata.responseText;
                            console.log(ip)
                        }
            */


            //call track.php using ajax
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        //                          var responseJSON = JSON.parse(xmlhttp.responseText);
                    }
                }
            };

            xmlhttp.open("GET", domain + 'track.php?pid=' + settings.mpid + '&mpageid=' + settings.mpageid + '&user=' + settings.muser + '&ref=' + ref + '&jsurl=' + encodeURIComponent(window.location.href), true);
            xmlhttp.send();

            //console.log(settings.muser);
            //console.log(domain);
            //console.log(settings.mpid);
            /*var iframeContainer = mPlan;
            //creating iframe
            var iframeUrl = domain + '/track.php?user=' + settings.user + '&iframe=1';
            var iframe = document.createElement('iframe');
            iframe.setAttribute('id', 'mplan-iframe-'+ settings.user);
            iframe.setAttribute('class', 'mplan-iframe');
            iframe.setAttribute('src', iframeUrl);
            iframe.setAttribute('style', 'height: 0px;');
            iframe.setAttribute('scrolling', 'no');
            iframeContainer.innerHTML = iframe.outerHTML;

            //hide iframe until loaded
            iframeContainer.style.display = 'none';*/

            //iframe on load
            /*var newIframe = document.getElementById('mplan-iframe-'+ settings.user);
            newIframe.onload = function() {
                //show iframe after fully loaded
                iframeContainer.style.display = 'block';
            }*/
        }
    }
}());


/*
var s_ajaxListener = new Object();
s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
s_ajaxListener.callback = function () {
    var test = extractEmails(this.data);
    if ( has_clicked && test != null && this.url.includes("whprepare") === false ) { // <-- to avoid an endless loop
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange = function () {
            if (xmlhttp2.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp2.status == 200) {
                    //                          var responseJSON = JSON.parse(xmlhttp.responseText);
                }
            }
        };                
        xmlhttp2.open("GET", domain + 'whprepare.php?pid=' + settings.mpid + '&mpageid=' + settings.mpageid + '&user=' + settings.muser + '&ref=' + encodeURIComponent(document.referrer) + '&jsurl=' + encodeURIComponent(window.location.href)+ "&email=" + encodeURIComponent( extractEmails(decodeURIComponent(test[0])) ), true) ;
        xmlhttp2.send(); 
    }
    
}

XMLHttpRequest.prototype.open = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  s_ajaxListener.tempOpen.apply(this, arguments);
  s_ajaxListener.method = a;  
  s_ajaxListener.url = b;
  if (a.toLowerCase() == 'get') {
    s_ajaxListener.data = b.split('?');
    s_ajaxListener.data = s_ajaxListener.data[1];
  }
}

XMLHttpRequest.prototype.send = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  s_ajaxListener.tempSend.apply(this, arguments);
  if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
  s_ajaxListener.callback();
}

function extractEmails (text) {
    return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

*/

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
