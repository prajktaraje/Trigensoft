function initMap(){





    /**
     * The CenterControl adds a control to the map that recenters the map on
     * Chicago.
     * This constructor takes the control DIV as an argument.
     * @constructor
     */
     function CenterControl(controlDiv, map) {
      // Set CSS for the control border.
      const controlUI = document.createElement("div");
      controlUI.style.backgroundColor = "#fff";
      controlUI.style.border = "2px solid #fff";
      controlUI.style.boxShadow = "0 4px 16px rgba(0,0,0,.3)";
      controlUI.style.cursor = "pointer";
      controlUI.style.marginBottom = "22px";
      controlUI.style.textAlign = "center";
      controlUI.style.marginRight = "20px";
      controlUI.style.borderRadius = "50px";
      controlUI.title = "Click to recenter the map";
      controlDiv.appendChild(controlUI);
      // Set CSS for the control interior.
      const controlText = document.createElement("div");
      controlText.style.color = "rgb(25,25,25)";
      controlText.style.fontFamily = "Roboto,Arial,sans-serif";
      controlText.style.width = "48px";
      controlText.style.height = "48px";
      controlText.style.lineHeight = "48px";
      controlText.innerHTML = "<img src=\"img/liveMap/ic_map_route.svg\" width=\"20px\" height=\"20px\">";;
      controlUI.appendChild(controlText);
    }


     /**
     * The CenterControl adds a control to the map that recenters the map on
     * Chicago.
     * This constructor takes the control DIV as an argument.
     * @constructor
     */
      function CenterControl02(controlDiv, map) {
        // Set CSS for the control border.
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = "#fff";
        controlUI.style.border = "2px solid #fff";
        controlUI.style.boxShadow = "0 4px 16px rgba(0,0,0,.3)";
        controlUI.style.cursor = "pointer";
        controlUI.style.marginBottom = "22px";
        controlUI.style.marginRight = "20px";
        controlUI.style.textAlign = "center";
        controlUI.style.borderRadius = "50px";
        controlUI.title = "Click to recenter the map";
        controlDiv.appendChild(controlUI);
        // Set CSS for the control interior.
        const controlText = document.createElement("div");
        controlText.style.color = "rgb(25,25,25)";
        controlText.style.fontFamily = "Roboto,Arial,sans-serif";
        controlText.style.width = "48px";
        controlText.style.height = "48px";
        controlText.style.lineHeight = "48px";
        controlText.innerHTML = "<img src=\"img/liveMap/ic_loc_red.svg\" width=\"20px\" height=\"20px\">";;
        controlUI.appendChild(controlText);
      }

    var mapCenter = new google.maps.LatLng( 42.3601, -71.0589);
    var options = {
        center: mapCenter,
        zoom:8,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: true,
        streetViewControl:false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
    }
    var map = new google.maps.Map(document.getElementById('cx-map'), options);


    var classNam = document.createElement("div");
    const centerControlDiv = classNam;
    classNam.id = "route-icon";
    var classNam02 = document.createElement("div");
    const centerControlDiv02 = classNam02;
    classNam.id = "route-icon02";
    CenterControl02(centerControlDiv02, map);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv02);
    CenterControl(centerControlDiv, map);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

            
          
            



    var iconBase = 'img/liveMap/';

    // Array of markers
    var markers = [
          {
            coords:{lat:42.8584,lng:-70.9300},
            iconImage:iconBase + 'ic_location.svg',
          },
      ];
  
      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }
  
      
      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          visible: true
          //icon:props.iconImage
        });
  
        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }
  
        // Check content
        if(props.content){
          
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });
  
          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    // Register an event listener to fire when the page finishes loading.
    google.maps.event.addDomListener(window, 'load', initMap);

}