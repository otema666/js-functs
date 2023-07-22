// var, const, let
const caja = document.getElementById("dev_info");
const reset_button = document.getElementById("rest_butt");


// Functions
function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function listCookies() {
    show_info()
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
    caja.innerHTML = aString
}


function print_text() {
    show_info()
    var texto = prompt("Ingrese un texto");
    reset_button.classList.remove("hidden");
    caja.innerHTML = texto;
} 

function device_info() {
    show_info();
    var info = {
        SO: detectOS(),
        Navegador: detectBrowser(),
        Is_mobile: is_mobile(),
        Time: detectTime(),
        resolution: detectResolution(),
        app: navigator.appName,
        lang: navigator.language,
        vendor: navigator.vendor,
        userAgent: navigator.userAgent,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        hardwareConcurrency: navigator.hardwareConcurrency,
        maxTouchPoints: navigator.maxTouchPoints
    
    };

    var json = "";

    for (var key in info) {
        json += '<span style="color:green">' + key + '</span>: ' + info[key] + "\n";
    }
    
    caja.innerHTML = json;
}

function detectOS() {
    let os = navigator.userAgent;
    let finalOs="";
    if (os.search('Windows')!==-1){
        finalOs="Windows";
    }
    else if (os.search('Mac')!==-1){
        finalOs="MacOS";
    }
    else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1)){
        finalOs="UNIX";
    }
    else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
        finalOs="Linux"
    }
    return finalOs

}

function detectBrowser() {
    let userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
        browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
        browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
        browserName = "Edge";
    } else {
        browserName = "No browser detection";
    }

    return browserName
}


function is_mobile() {
    var a;
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)) {
        a = "Yes";
    } else {
        a = "No";
    }
    return a;
}

function detectResolution() {
    resol = [
      "\n\t" + "Window size: " + window.innerWidth + 'x' + window.innerHeight + "\n\t" +
      "Screen size: " + window.screen.width + 'x' + window.screen.height + "\n\t" +
      "Available screen size: " + window.screen.availWidth + 'x' + window.screen.availHeight + "\n\t" +
      "Color depth: " + window.screen.colorDepth + "\n\t" +
      "Orientation: " + (window.screen.orientation ? window.screen.orientation.type : "N/A") + "\n\t" +
      "Orientation Lock: " + (window.screen.orientation ? window.screen.orientation.locked : "N/A") + "\n\t" +
      "TimeZone: " + Intl.DateTimeFormat().resolvedOptions().timeZone + "\n"
    ];

    return resol

}

function detectTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    var formattedTime = hours + ":" + minutes + ":" + seconds;
    return formattedTime;
}


function show_info() {
    caja.classList.remove("hidden")
}


function reset() {  
   if (confirm("¿Estás seguro de que deseas recargar la página?")) {
    location.reload();
  }
}

function main() {
    caja.classList.add("hidden")
}

main()