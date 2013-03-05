class Main
{
	var URLS_FILE_PATH : String = "template/urls.txt";

	var LECTURES_TEMPLATE : String = "template/lectures.json";

	var LECTURES_JSON_OUTPUT_PATH : String = "output/lectures.json";

	function new()
	{
		var urls = xa.File.read(URLS_FILE_PATH).split("\n");

		var lectures_data_template = [];

		for (i in 0...urls.length)
		{
			lectures_data_template.push
				(
					{
						id: i + 1,
						title: "Title " + i,
						description: "Description " + i,
						url: urls[i]
					}
				);
		}

		var lectures_template = new haxe.Template(xa.File.read(LECTURES_TEMPLATE));

		var lectures_output_json = xa.File.write(LECTURES_JSON_OUTPUT_PATH, lectures_template.execute({lectures: lectures_data_template}));
	}

	function log(txt : String) : Void
	{
		xa.Utils.print(txt);
	}

	public static function main()
	{
		new Main();
	}
}