
$.ajax({
  type: "GET",  
  url: "irregular.json",
  dataType: "text",       
  success: function(response)  
  {
    var data = JSON.parse(response);

    var all_html = "";
	var max_count = Object.keys(data).length;
	var total_matches = max_count;
	
	document.getElementById("dynamicCount").innerHTML="" + total_matches + " of " + max_count + " match...";
	
    for (var key in data){
        var insertion = "";
        //console.log(data[key])
        
        meta = data[key];
        tags = get_tags(key,meta);
        
        insertion += "<div class='square panel'>"; /* to be continued */
        // invisible div with metadata string... easiest way for now.
        insertion += "<div class='metadata'>" + tags + "</div>";
        insertion += "<h1 class='name'>" + key + "</h1>";

        insertion += format_dict(meta);

        insertion +=  "</div> ";
        
        all_html += insertion;
    }
    document.getElementById('panel_container').innerHTML = all_html;
  }   
});

function format_dict(object){
    /* Just a placeholder thing that helps with validating the search. */
    /* Replace with whatever code is automatically generated based on the obj. */
    /*
    for (var entry_key in meta){
        console.log(entry_key)
        insertion += entry_key + " : " + meta[entry_key];
        insertion += " ";
    }
    */
    var text="<table>";
    for (var key in object){
        text += "<tr>";
        text += "<td>"+key;
        text += "<td>"+object[key];
        text += "</tr>"
    }
    text += "</table> ";
    return text
}

function get_tags(name,object){
    /* less than optimal version */
    /* Just join all the metadata values in a single string. */
    /* This will be put as text in the hidden div object to be searched on. */
    var text = name;
    for (var key in object){
        text += " " + object[key];
    }
    return text
}

function filter() {
  // Declare variables
  var input, query, panels, meta, txtValue;
  input = document.getElementById("myInput");
  query = input.value.toUpperCase();

  panels = document.getElementsByClassName("panel");
  
  var total_matches = 0;
  var max_count = panels.length;
  
  if (query.length == 0){
    // remove both sets of tags and/or do nothing.
    for (i = 0; i < panels.length; i++) {
        panels[i].classList.remove('panel-nonmatching');
        panels[i].classList.remove('panel-matching');
    }
    total_matches = panels.length;
  }
  else {
      // Loop through all table rows, and hide those who don't match the search query
      for (i = 0; i < panels.length; i++) {
        meta = panels[i].getElementsByClassName("metadata")[0];
        
        if (meta) {
          txtValue = meta.textContent || meta.innerText;
          if (txtValue.toUpperCase().indexOf(query) > -1) {
            //panels[i].style.display = "";
            panels[i].classList.remove('panel-nonmatching')
            panels[i].classList.add('panel-matching')
	        total_matches += 1;
          } else {
            panels[i].classList.add('panel-nonmatching')
            panels[i].classList.remove('panel-matching')
          }
        }
      }
  }
  // Update the number of results found.
  document.getElementById("dynamicCount").innerHTML = total_matches + " of " + max_count + " match...";
}
