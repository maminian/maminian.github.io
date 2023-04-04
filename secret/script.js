
$.ajax({
  type: "GET",  
  url: "./socams2023talks.json",
  dataType: "text",       
  success: function(response)  
  {
    var data = JSON.parse(response);

    var all_html = "";
    for (var key in data){
        var insertion = "";
        //console.log(data[key])
        
        meta = data[key];
        tags = get_tags(key,meta);
        
        insertion += "<div class='talk'>"; /* to be continued */
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

  panels = document.getElementsByClassName("talk");
  
  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < panels.length; i++) {
    meta = panels[i].getElementsByClassName("metadata")[0];
    
    if (meta) {
      txtValue = meta.textContent || meta.innerText;
      if (txtValue.toUpperCase().indexOf(query) > -1) {
        panels[i].style.display = "";
      } else {
        panels[i].style.display = "none";
      }
    }
  }
}
