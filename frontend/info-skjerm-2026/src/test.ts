import { putAnnouncements } from "./hooks/useAnouncements";

const list = [
	{
		title: "Test melding",
		content: "3D printer kurs starter i morgen kl. 14:00.",
		dateStart: "2023-10-01",
		dateEnd: "2023-10-02",
	},
	{
		title: "Test melding 2",
		content: "Resin printer kurs starter i morgen kl. 14:00.",
		dateStart: "2023-10-01",
		dateEnd: "2023-10-02",
	},
	{
		title: "Test melding 3",
		content: "Laser cutter kurs starter i morgen kl. 14:00.",
		dateStart: "2023-10-01",
		dateEnd: "2023-10-02",
	},
	{
		title: "Test melding 4",
		content: "CNC kurs starter i morgen kl. 14:00.",
		dateStart: "2023-10-01",
		dateEnd: "2023-10-02",
	},
];
for (const element of list) {
    putAnnouncements(element);
}
