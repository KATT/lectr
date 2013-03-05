class Main
{
	var youtube_api_key : String = null;

	var URLS_FILE_PATH : String = "template/urls.txt";

	var LECTURES_TEMPLATE : String = "template/lectures.json";

	var DATA_TEMPLATE : String = "template/data.json";

	var DATA_JSON_OUTPUT_PATH : String = "output/data.json";

	var PROPERTIES_FILE : String = "properties/dev.properties";

	function new()
	{
		if(!xa.File.isFile(PROPERTIES_FILE))
		{
			exit("Cannot find dev properties file");
		}

		var lines = xa.File.read(PROPERTIES_FILE).split("\n"); 

		for(line in lines)
		{
			if(null == line || "" == line || StringTools.startsWith(line, "#"))
			{
				continue;
			}

			var bits = line.split("=");
			var key = bits.shift();
			var value = bits.join("=");

			switch(key)
			{
				case "youtube_api_key":
					youtube_api_key = value;
			}
		}

		if(null == youtube_api_key)
		{
			exit("Cannot find Youtube API key in properties file");
		}

		log("Found Youtube API key");

		var urls = xa.File.read(URLS_FILE_PATH).split("\n");

		var lectures = [];

		for (i in 0...urls.length)
		{
			var url = urls[i];
			var id = url.substr(url.indexOf("=") + 1, url.length);

			log("About to load video: " + url);

			var atom_content = "";
			var error = null;

			var request = getRequest(id);
			request.onData = function(data : String) : Void { atom_content = data; };
			request.onError = function (msg : String) : Void { error = msg; };
			request.request(false);

			if(null != error)
			{
				log(error); 
				continue;
			}

			var fast = new haxe.xml.Fast(Xml.parse(atom_content).firstElement());
			var title = fast.node.title.innerHTML;
			var description = fast.node.content.innerHTML;

			lectures.push
				({
					id: i + 1,
					title: haxe.Json.stringify(title),
					description: haxe.Json.stringify(description),
					url: urls[i]
				});
		}

		var lectures_template = new haxe.Template(xa.File.read(LECTURES_TEMPLATE));

		var lectures_output = lectures_template.execute({lectures: lectures}).split("\n");
		lectures_output = lectures_output.slice(0, lectures_output.length - 1); // <-- removes last comma

		var data_template = new haxe.Template(xa.File.read(DATA_TEMPLATE));

		xa.File.write(DATA_JSON_OUTPUT_PATH, data_template.execute({lectures: lectures_output.join("\n")}));
	}

	function getRequest(video_id : String) : haxe.Http
	{
		var url = "https://gdata.youtube.com/feeds/api/videos/" + video_id;

		var request = new haxe.Http(url);
		request.setHeader("X-GData-Key", "key=" + youtube_api_key);

		return request;
	}

	function log(txt : String) : Void
	{
		xa.Utils.print(txt);
	}

	function exit(?txt) : Void
	{
		if(null != txt)
		{
			log(txt);
		}

		xa.Application.exit(1);
	}

	public static function main()
	{
		new Main();
	}
}