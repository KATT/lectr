class Main
{
	var URLS_FILE_PATH : String = "template/urls.txt";

	var LECTURES_TEMPLATE : String = "template/lectures.json";

	var DATA_TEMPLATE : String = "template/data.json";

	var DATA_JSON_OUTPUT_PATH : String = "output/data.json";

	function new()
	{
		var urls = xa.File.read(URLS_FILE_PATH).split("\n");

		var lectures = [];

		for (i in 0...urls.length)
		{
			lectures.push
				({
					id: i + 1,
					title: "Title " + i,
					description: "Description " + i,
					url: urls[i]
				});
		}

		var lectures_template = new haxe.Template(xa.File.read(LECTURES_TEMPLATE));

		var lectures_output = lectures_template.execute({lectures: lectures}).split("\n");
		lectures_output = lectures_output.slice(0, lectures_output.length - 1); // <-- removes last comma

		var data_template = new haxe.Template(xa.File.read(DATA_TEMPLATE));

		xa.File.write(DATA_JSON_OUTPUT_PATH, data_template.execute({lectures: lectures_output.join("\n")}));
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