var map;
var marker;
var myMap=new Map();
var count=0;
function initialize(lat,lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);

  var myOptions = {
    zoom: 19,
    center: myLatlng,
    mapTypeId: 'satellite'
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  marker = new google.maps.Marker({
    draggable: true,
    position: myLatlng,
    map: map,
    title: "Your location",
    icon: mIcon,
    label: {color: '#000', fontSize: '12px', fontWeight: '600',
      text: '123'}
  });
  var mIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillOpacity: 1,
    fillColor: '#fff',
    strokeOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#333',
    scale: 12
  };


  google.maps.event.addListener(marker, 'dragend', function(event) {


    document.getElementById("lat").value = event.latLng.lat();
    document.getElementById("long").value = event.latLng.lng();
    
  });

  google.maps.event.addListener(map, 'click', function(event) {
    document.getElementById("lat").value = event.latLng.lat();
    document.getElementById("long").value = event.latLng.lng();
    marker.setPosition(event.latLng);
    myMap.set(document.getElementById("lat").value,document.getElementById("long").value)
    count+=1;
    myFunction();
    if(count>0)
    {
    retreive();
    }
  });
}
navigator.geolocation.getCurrentPosition(
  function (position) {
    google.maps.event.addDomListener(window, "load", initialize(position.coords.latitude, position.coords.longitude));
  },
  function errorCallback(error) {
     console.log(error);
  }
);
// google.maps.event.addDomListener(window, "load", initialize());
	
function myFunction() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(count);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3=row.insertCell(2);
  var cell4=row.insertCell(3);
  var cell5=row.insertCell(4);
  cell1.innerHTML = count;
  cell2.innerHTML = document.getElementById("lat").value ;
  cell3.innerHTML=document.getElementById("long").value ;
  cell4.innerHTML="8 mts";
  cell5.innerHTML=2;
}
function retreive(){
  var lat0=document.getElementById("myTable").rows[count-1].cells[1].innerHTML;
  var long0=document.getElementById("myTable").rows[count-1].cells[2].innerHTML;
  var lat1=document.getElementById("myTable").rows[count].cells[1].innerHTML;
  var long1=document.getElementById("myTable").rows[count].cells[2].innerHTML;
  var lineCoordinates=[new google.maps.LatLng(lat0,long0),new google.maps.LatLng(lat1,long1)];
  console.log(lineCoordinates)
  var lineSymbol = {
    // // path: 'M 0,-2 0,1',
    // strokeOpacity: 1,
    // scale: 4
    path: "M -2,0 0,-2 2,0 0,2 z",
    strokeColor: "#00008B",
    fillColor: "#00008B",
    fillOpacity: 0.5
  };
  var line = new google.maps.Polyline({
    path: lineCoordinates,
    strokeOpacity: 0,
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }],
    map: map
  });
}
function tableToJson(table) {
  var data = [];

  // first row needs to be headers
  var headers = [];
  for (var i=0; i<table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
  }

  // go through cells
  for (var i=1; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
      var rowData = {};

      for (var j=0; j<tableRow.cells.length; j++) {

          rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

      }

      data.push(rowData);
  }       

  return data;
}
function pull()
{
  var myjson=JSON.stringify(tableToJson(document.getElementById("myTable")));
console.log(myjson);
downloadObjectAsJson(myjson,"Swach-Json-File")
}
function downloadObjectAsJson(exportObj, exportName)
{var b=JSON.stringify(exportObj);
  str = b.replace(/\\/g, '');
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(str);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
console.log(5);





