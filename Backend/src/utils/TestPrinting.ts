// Function for easier and more viseble logs

export function print(...items: any[]) {
	let PrintingString: string = "";
	for (let index = 0; index < items.length; index++) {
		const item = items[index];
		PrintingString += JSON.stringify(item);
		PrintingString += index == items.length - 1 ? "    |" : "   ||   ";
	}
	console.log(PrintingString + "\n");
}
