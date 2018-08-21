var data = {};

// Load JSON text from server hosted file and return JSON parsed object
function loadJSON(filePath) {
	// Load JSON file;
	var json = loadTextFileAjaxSync(filePath, "application/json");
	// Parse JSON
	return JSON.parse(json);
}

// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType)
{
	var xmlhttp = new XMLHttpRequest();
	//Using synchronous request
	xmlhttp.open("GET", filePath, false);
	if (mimeType != null) {
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType(mimeType);
		}
	}
	try {
		xmlhttp.send();
	}catch(error) {
		console.log("Invalid target address.");
		return null
	}

	if (xmlhttp.status == 200)
	{
		return xmlhttp.responseText;
	}else {
		console.log("Invalid xmlhttp.status.");
		return null;
	}
}

data.heroes = loadJSON('battleSim/json/hero.json');


$(document).ready(function() {
    //Populate hero select options
	var heroHTML = "<option value=-1 class=\"hero_option\">Select Hero</option>";
	for(var i = 0; i < data.heroes.length; i++){
		heroHTML += "<option value=" + i + " class=\"hero_option\">" + data.heroes[i].name + "</option>";
    }
    
    $("#challenger_name, #cl_enemy_name").html(heroHTML);
});