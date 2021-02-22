var button = document.getElementById("button");

button.addEventListener("click",function(){
    fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q="+ input_value.value, 
    {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "6c38c7dd6amsh7ea5289e0fa3b26p105da8jsn897aec2e0f99",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        if(response !== null){
        var city_id_value = response["city"]["id"];
        var city_value = response["city"]["name"];
        var longitude_value = response["city"]["coord"]["lon"];
        var latitude_value = response["city"]["coord"]["lat"];
        var items = response["list"];
        

        // General Info card
        var display = document.getElementById("display");
        var row1 = document.createElement("DIV");
        row1.setAttribute("class","row");
        display.appendChild(row1);
        var col = document.createElement("DIV");
        col.setAttribute("class","col-12 col-md-12");
        row1.appendChild(col);
        var card1 = document.createElement("DIV");
        card1.setAttribute("class","card bg-orange text-white text-center fs-30");
        col.appendChild(card1);
        var card_body1 = document.createElement("DIV");
        card_body1.setAttribute("class","card-body");
        card1.appendChild(card_body1);
        var card_title1 = document.createElement("H3");
        card_title1.setAttribute("class","card-title");
        card_body1.appendChild(card_title1);
        card_title1.innerHTML = "General Info";
        var city_name = document.createElement("P");
        city_name.setAttribute("class","card-text");
        card_body1.appendChild(city_name);
        city_name.innerHTML = "City:" + " " + city_value;
        var city_id = document.createElement("P");
        city_id.setAttribute("class","card-text");
        card_body1.appendChild(city_id);
        city_id.innerHTML = "ID:" + " " + city_id_value;
        var longitude = document.createElement("P");
        longitude.setAttribute("class","card-text");
        card_body1.appendChild(longitude);
        longitude.innerHTML = "Longitude:" + " " + longitude_value;
        var latitude = document.createElement("P");
        latitude.setAttribute("class","card-text");
        card_body1.appendChild(latitude);
        latitude.innerHTML = "Latitude:" + " " + latitude_value;
       
       
        // Forecast table and graph(humidity against temperatures)
        //Forecast table
        var row2 = document.createElement("DIV");
        row2.setAttribute("class","row mt-4");
        display.appendChild(row2);
        var col1 = document.createElement("DIV");
        col1.setAttribute("class","col-12 col-md-6");
        row2.appendChild(col1);
        var card2 = document.createElement("DIV");
        card2.setAttribute("class","card forecast-data fs-30");
        col1.appendChild(card2);
        var card_body2 = document.createElement("DIV");
        card_body2.setAttribute("class","card-body");
        card2.appendChild(card_body2);
        var card_title2 = document.createElement("H3");
        card_title2.setAttribute("class","card-title");
        card_body2.appendChild(card_title2);
        card_title2.innerHTML = "5 day/3 hour forecast data";

        
        //Load table headers
        function loadTableHead(){
            var forecast_table = document.createElement("TABLE");
            forecast_table.setAttribute("id", "forecast_table");
            forecast_table.className ="table table-striped table-responsive-sm orange fs-30";
            card_body2.appendChild(forecast_table);
            var header = forecast_table.createTHead();
            var header_row = header.insertRow(0);
            var headerCell1 = document.createElement("TH");
            var no_column = document.createTextNode("No");
            headerCell1.appendChild(no_column);
            header_row.appendChild(headerCell1);
            var headerCell2 = document.createElement("TH");
            var humidity_column = document.createTextNode("Humidity");
            headerCell2.appendChild(humidity_column);
            header_row.appendChild(headerCell2);
            var headerCell3 = document.createElement("TH");
            var temp_column = document.createTextNode("Temperature(\u00B0 F)");
            headerCell3.appendChild(temp_column);
            header_row.appendChild(headerCell3);
            var headerCell4 = document.createElement("TH");
            var pressure_column = document.createTextNode("Pressure");
            headerCell4.appendChild(pressure_column);
            header_row.appendChild(headerCell4);
        }
        
        //Load table data
            function loadTableData(items){
                loadTableHead();
                var row_number = 1;
                items.forEach(
                    item => {
                        var row = forecast_table.insertRow();
                        var no = row.insertCell(0);
                        var humidity = row.insertCell(1);
                        var temperature = row.insertCell(2);
                        var pressure = row.insertCell(3);
                        no.innerHTML = row_number++;
                        humidity.innerHTML = item["main"]["humidity"];
                        temperature.innerHTML = item["main"]["temp"];
                        pressure.innerHTML = item["main"]["pressure"];
                    }
                )

        }

        loadTableData(items);

        //Forecast graph(Humidity against temperatures)
        var col2 = document.createElement("DIV");
        col2.setAttribute("class","col-12 col-md-6");
        row2.appendChild(col2);
        var card3 = document.createElement("DIV");
        card3.setAttribute("class","card forecast-data fs-30");
        col2.appendChild(card3);
        var card_body3 = document.createElement("DIV");
        card_body3.setAttribute("class","card-body");
        card3.appendChild(card_body3);
        var card_title3 = document.createElement("H3");
        card_title3.setAttribute("class","card-title");
        card_body3.appendChild(card_title3);
        card_title3.innerHTML = "Graph of humidity against temperature";
        var graph_canvas = document.createElement("CANVAS");
        graph_canvas.setAttribute("id", "graph_chart");
        card_body3.appendChild(graph_canvas);

        var graph_chart = document.getElementById("graph_chart").getContext("2d");

        var i = 0;

        var weather_chart = new Chart(graph_chart, {
            type:'line',
            data:{
                labels:response["list"].forEach(
                    item => {items[i];
                    i++;
                    }
                ),
                datasets:[{
                    label:"Humidity",
                    data:[
                        response["list"].forEach(
                            item => {
                                item["main"]["humidity"];
                            }
                        ), 
                    ],
                    backgroundColor: "#fc6600",
                },{
                    label:"Temperature",
                    data:[
                        response["list"].forEach(
                            item => {
                                item["main"]["temp"];
                            }
                        ), 
                    ],
                    backgroundColor: "green"
                }],
            },
            options:{}
        });
        
        
        //document.getElementById("temp").innerHTML = temp_value;
        }
        
    })
    .catch(err => {
        alert("Wrong city name")
    });
});





