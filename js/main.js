    var map;
	var CUSTOM_BASEMAP = {
        name: 'Custom Map',
        alt: 'Custom Basemap'
    }
	var geoJsonObject;
  
    //var thejson;
	var region = new google.maps.LatLng(40.2674, -74.7358);
	
    
    
    $('.layer').on('change', function(e){
        var item = $(this),
            layer_id = item.attr('data-id'),
            dataLayer = window[$(this).attr('data-layer')];
        if (item.prop('checked')){
            dataLayer.forEach(function(d){
                if(d.getProperty('TYPE') === layer_id ) {
                    dataLayer.overrideStyle(d, {visible:true});                
                }
            });
        }else{
            dataLayer.forEach(function(d){
                if (d.getProperty('TYPE') === layer_id){
                    dataLayer.overrideStyle(d, {visible:false});
                } 
            });                    
        }
    });
        
        

    function toggleLayer(dataLayer,id){
        if ($('#'+id).is(':checked')){
            dataLayer.setMap(map);
        }
        else {
            dataLayer.setMap(null);
        }
    };  
//    
//    function revert(data){
//        return data1.revertStyle(); 
//        
//    }
        
	function initialize() {

        var $style = [
//          {
//            "featureType": "poi.park",
//            "elementType": "geometry.fill",
//            "stylers": [
//              { "hue": "#4cff00" },
//              { "saturation": -15 },
//              { "lightness": -15 }
//            ]
//          },{
//            "featureType": "poi.park",
//            "elementType": "labels.text.fill",
//            "stylers": [
//              { "hue": "#00ffc4" },
//              { "lightness": -35 }
//            ]
//          }
            {
                "stylers": [
                  { "hue": "#d4ff00" },
                  { "saturation": -99 }
                ]
              },{
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  { "hue": "#00ffc4" },
                  { "saturation": 35 }
                ]
              },{
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [
                  { "color": "#4c714c" },
                  { "weight": 0.5 }
                ]
              }
        ];
      // Create a simple map.
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: 40.279,  
                lng:-74.714
            },
            mapTypeId: 'Custom Basemap',  
    	    mapTypeControlOptions: {
    	        mapTypeIds: ['Custom Basemap', google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.HYBRID],
    	        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            // draggableCursor: 'pointer', // every pixel is clickable.
            streetViewControl: true //my favorite feature in V3!
        });
      
        map.enableKeyDragZoom();          
              

        map.mapTypes.set('Custom Basemap', new google.maps.StyledMapType($style, CUSTOM_BASEMAP));
 
	    var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);

	    data1 = new google.maps.Data();
	    data1.loadGeoJson('data/MTN_84.js');
	    data1.setMap(map);
	    data1.setStyle(function (feature) {
		    return {
                strokeColor: '#6479B5',
	            strokeWeight: 2.0,
            	fill: true,
            	clickable: true
            }
	    });


		
        data1.addListener('click', function(e) {
	        data1.revertStyle();
            data4.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
	        data1.overrideStyle(e.feature, { 
	    //	clickable: true,
	            fillOpacity: .7,   
	            strokeColor: '#ff0000',
	            strokeWeight: 4
		    });
        });	
		
        data1.addListener('click', function(e) {
            var content = '<b style="color: #461326">Trail Name: </b>'+e.feature.getProperty('TRAIL_NAME');
	       
            $('#info-bar').html(content);
        });

   
	    var imageRail = new google.maps.MarkerImage('img/railstation.png',
	                    new google.maps.Size(24,24)
                    );

    	data2 = new google.maps.Data();
        data2.loadGeoJson('data/RailStations.js');
        data2.setMap(map);
        data2.setStyle(function (feature) {
            return {
                clickable: true,      
                icon:imageRail
	        } 
        });
        
        
        var infowindow = new google.maps.InfoWindow();
        
        data2.addListener('click', function(e){
            infowindow.setContent("<div class='station-window'><b>Station: </b>" + e.feature.getProperty("STATION") + "<br><b>Line: </b>" + e.feature.getProperty("LINE") + "</div>");
            infowindow.setPosition(e.feature.getGeometry().get());
            infowindow.setOptions({
                pixelOffset: new google.maps.Size(0,-30)
            });
            infowindow.open(map);
        });
        
        data2.addListener('mouseout', function(e){
            infowindow.close(map);
        })
        
        
        
        
//        data2.addListener('click', function(e){
//            var contentString = '<div class="popup"><b>Station: </b>' + e.feature.getProperty('STATION')
//                              + '<br><b>Line: </b>' + e.feature.getProperty('LINE')
//                              + '</div>';
//            var infowindow = new google.maps.InfoWindow({
//                content: contentString
//            });
//            
//            $('#infosidebar').html(contentString);
//            
//        });
//		
        // Symbology for places //
        var imgLibrary = new google.maps.MarkerImage('img/library.png',
                         new google.maps.Size(24,24));
        
        var imgSchool = new google.maps.MarkerImage('img/school.png',
                        new google.maps.Size(24,24));
        
        var imgBusiness = new google.maps.MarkerImage('img/office.png',
                          new google.maps.Size(24,24));
        
        var imgCollege = new google.maps.MarkerImage('img/university2.png',
                         new google.maps.Size(24,24));
        
        var imgGov = new google.maps.MarkerImage('img/gov-50.png',
                     new google.maps.Size(50,50));
        
        var imgHospital2 = new google.maps.MarkerImage('img/hospital2.png',
                          new google.maps.Size(24,24));
        
        var imgCult = new google.maps.MarkerImage('img/cult.png',
                      new google.maps.Size(30,30));
        
        var imgPolice = new google.maps.MarkerImage('img/police.png',
                        new google.maps.Size(24,24));
        
        var imgEMS = new google.maps.MarkerImage('img/hospital2.png',
                     new google.maps.Size(24,24));
        
        var imgFire = new google.maps.MarkerImage('img/fire.png',
                      new google.maps.Size(24,24));
        
        var imgPark = new google.maps.MarkerImage('img/park3.png',
                      new google.maps.Size(24,24));
        
        var imgShop = new google.maps.MarkerImage('img/mall.png',
                      new google.maps.Size(24,24));
        
        function setIcon(feature){
            var prop = feature.getProperty('TYPE');
            var subtype = feature.getProperty('SUB_TYPE')
            if (prop == ('School')) {
                return imgSchool
            } else if (prop == ('College')) {
                return imgCollege
            } else if (prop == ('Business/Office Park')) {
                return imgBusiness
            } else if (prop == ('Park') || prop == ('Recreational')) {
                return imgPark
            } else if (prop == ('Hospital')) {
                return imgHospital2
            } else if (prop == ('Police')) {
                return imgPolice
            } else if (prop == ('Fire')) {
                return imgFire       
            } else if (prop == ('Library')) {
                return imgLibrary 
            } else if (prop == ('Shopping Center')) {
                return imgShop
            } else if (prop == ('Government')) {
                return imgGov
            } else if (prop == ('Cultural')) {
                return imgCult
            }
        };
        
        
        data3 = new google.maps.Data();
        data3.loadGeoJson('data/Places.js');
        data3.setMap(map);
        data3.setStyle(function(feature){
            return {
                clickable: true,
                visible: false,
                icon: setIcon(feature)
            }
        });

    
//      Place Information -- change to popup?
        
        data3.addListener('click', function(e){
            infowindow.setContent("<div class='poi-window'><b>Name: </b>" + e.feature.getProperty('NAME') 
                                  + "<br><b>Address: </b>" + e.feature.getProperty('ADDRESS') 
                                  + "<br><b>Type: </b>" + e.feature.getProperty('TYPE') 
                                  + "</div>");
            infowindow.setPosition(e.feature.getGeometry().get());
            infowindow.setOptions({
                pixelOffset: new google.maps.Size(0,-30)
            });
            infowindow.open(map);
        });
        
        data3.addListener('mouseout', function(e){
            infowindow.close(map);
        })
        
		
	    data4 = new google.maps.Data();
	    data4.loadGeoJson('data/Excellent.js');
    	data4.setMap(map);
    	data4.setStyle(function (feature) {
		    return {   
                strokeColor: '#3AA566',
			    strokeWeight: 3,
        		fill: true,
        		clickable: true
	        }
		});
	
        data4.addListener('click', function(e) {
            data1.revertStyle();
    	    data4.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
            data4.overrideStyle(e.feature,{ 
	    //	 clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
		    });
        });		
		
        data4.addListener('click', function(e) {
            var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
                		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';

	        $('#info-bar').html(content);
        });		
	
        data5 = new google.maps.Data();
    	data5.loadGeoJson('data/Fair.js');
    	data5.setMap(map);
    	data5.setStyle(function (feature) {
    		return {   
                strokeColor: '#713AA5',
    			strokeWeight: 3,
        		fill: true,
        		clickable: true
	        }
		});
	
        data5.addListener('click', function(e) {
            data1.revertStyle();
    	    data5.revertStyle();
            data4.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
            data5.overrideStyle(e.feature,{ 
    	    //	 clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
    		});
        });		
		
        data5.addListener('click', function(e) {
        var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
            		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';

            $('#info-bar').html(content);
        });

	    data6 = new google.maps.Data();
	    data6.loadGeoJson('Data/Unfavorable.js');
	    //data6.setMap(map);
	    data6.setStyle(function (feature) {
    		return {   
                strokeColor: '#EDBE26',
    			strokeWeight:3,
        		fill: true,
        		clickable: true
    	    }
		});
		
        data6.addListener('click', function(e) {
            data1.revertStyle();
    	    data6.revertStyle();
            data5.revertStyle();
            data4.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
            data6.overrideStyle(e.feature,{ 
    	// clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
        	});
        });	
		
        data6.addListener('click', function(e) {
            var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
                		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';

	   
            $('#info-bar').html(content);
        });	
	
        data7 = new google.maps.Data();
	    data7.loadGeoJson('data/Unbikeable.js');
	    //data7.setMap(map);
	    data7.setStyle(function (feature) {
		    return {   
                strokeColor: '#E83A28',
    			strokeWeight: 3,
        		fill: true,
        		clickable: true
	        }
		});
		
        data7.addListener('click', function(e) {
            data1.revertStyle();
    	    data7.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data4.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
            data7overrideStyle(e.feature, { 
	    //	 clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
		    });
        });	
		
        data7.addListener('click', function(e) {
            var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
                		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';


	        $('#info-bar').html(content);
        });	
	
        data8 = new google.maps.Data();
    	data8.loadGeoJson('data/Minor_Favorable.js');
    	//data8.setMap(map);
    	data8.setStyle(function (feature) {
		    return {   
                strokeColor: '#515151',
    			strokeWeight: 2,
        		fill: true,
        		clickable: true
	        }
		});	
		
        data8.addListener('click', function(e) {
            data1.revertStyle();
    	    data8.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data4.revertStyle();
            data9.revertStyle();
            data8.overrideStyle(e.feature,{ 
    	//	clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
        	});
        });	
		
        data8.addListener('click', function(e) {
            var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
                		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';

	   
            $('#info-bar').html(content);
        });	
	
        data9 = new google.maps.Data();
    	data9.loadGeoJson('Data/Minor_Unfavorable.js');
//    	data9.setMap(map);
    	data9.setStyle(function (feature) {
		    return {
                strokeColor: '#F37D80',
			    strokeWeight:2,
        		fill: true,
        		clickable: true
	        }
		});
	
        data9.addListener('click', function(e) {
            data1.revertStyle();
    	    data9.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data4.revertStyle();
            data9.overrideStyle(e.feature,{ 
    	 //	 clickable: true,
                fillOpacity: .7,   
                strokeColor: '#ff0000' ,
                strokeWeight: 4
        	});
        });		
		
        data9.addListener('click', function(e) {
            var content = '<b>Lanes: </b>'+e.feature.getProperty('LANES')
                		 +'<br><b>BLOS Score: </b>'+e.feature.getProperty('BLOS')+ '&nbsp;&#40;'+e.feature.getProperty('SCORE')+'&#41;';


	        $('#info-bar').html(content);
        });	

		$.getJSON('data/MunicipalBoundary.js', function(d) {
			var data = new google.maps.Data({
                map: map, 
                style:{
                    stroke:true,
                    fillColor:'none',
                    strokeColor: 'black',
                    strokeWeight: 1.5,
                    fill: true, 
                    opacity: 1,
                    fillOpacity:0, 
                    clickable: false 
                }
            });
			data.addGeoJson(d);
		});

		$.getJSON('data/CountyBoundary.js', function(d) {
			var data = new google.maps.Data({
				map: map, 
				style: {
					stroke:true,
					fillColor:'none',
					strokeColor: '#000',
					strokeWeight: 5,
					fill: true, 
					opacity: 1,
					fillOpacity: 0, 
					clickable: false 
				}
			});
			data.addGeoJson(d);
		});
        
        $("#zoomToRegion").click(function(){
            map.setCenter(new google.maps.LatLng(40.279, -74.714));
            map.setZoom(11);
        });

        $("#zoomToStudy1").click(function(){
            map.setCenter(new google.maps.LatLng(40.260600, -74.52942));
            map.setZoom(13);
        });

        $("#zoomToStudy2").click(function(){
            map.setCenter(new google.maps.LatLng(40.265030, -74.80056));
            map.setZoom(13);
        });

        $("#zoomToStudy3").click(function(){
            map.setCenter(new google.maps.LatLng(40.204640,-74.67638));
            map.setZoom(13);
        });

        $("#zoomToStudy4").click(function(){
            map.setCenter(new google.maps.LatLng(40.268600, -74.52528));
            map.setZoom(15);
        });

        $("#zoomToStudy5").click(function(){
            map.setCenter(new google.maps.LatLng(40.389300, -74.76382));
            map.setZoom(15);
        });

        $("#zoomToStudy6").click(function(){
            map.setCenter(new google.maps.LatLng(40.346240, -74.80683));
            map.setZoom(12);
        });

        $("#zoomToStudy7").click(function(){
            map.setCenter(new google.maps.LatLng(40.295380, -74.72054));
            map.setZoom(13);
        });

        $("#zoomToStudy8").click(function(){
            map.setCenter(new google.maps.LatLng(40.326260, -74.79075));
            map.setZoom(15);
        });

        $("#zoomToStudy9").click(function(){
            map.setCenter(new google.maps.LatLng(40.356240, -74.66933));
            map.setZoom(14);
        });

        $("#zoomToStudy10").click(function(){
            map.setCenter(new google.maps.LatLng(40.222000, -74.59099));
            map.setZoom(13);
        });

        $("#zoomToStudy11").click(function(){
            map.setCenter(new google.maps.LatLng(40.223690, -74.76414));
            map.setZoom(13);
        });

        $("#zoomToStudy12").click(function(){
            map.setCenter(new google.maps.LatLng(40.289710, -74.62665));
            map.setZoom(13);
        });

       

        google.maps.event.addListener(map, 'click', function() {
            data1.revertStyle();
            data4.revertStyle();
            data5.revertStyle();
            data6.revertStyle();
            data7.revertStyle();
            data8.revertStyle();
            data9.revertStyle();
        });
  
    }

        google.maps.event.addDomListener(window, 'load', initialize);

