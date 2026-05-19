import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAnnouncements } from "../hooks/announcementsDummydata";
import { ScrollWindow } from "./ScrollWindow";

function AnnouncementsGrid() {
  const {
    data: announcements,
    isError,
    isLoading,
    isPending,
  } = useAnnouncements();

  if (isError) {
    return <div>Feil ved lasting av kunngjøringer.</div>;
  }

  if (isLoading || isPending) {
    return <div>Laster in kunngjøringer...</div>;
  }
  return (
		<div className="flex flex-col h-full">
			<Typography variant="h4">Kunngjøringer</Typography>
			<ScrollWindow startPause={2000} scrollTime={8000} endPause={2000} easeIn easeOut className="flex-1 min-h-0 w-full px-3">
				<div className="grid grid-cols-3 gap-4 mt-4">
					{announcements?.map(announcement => (
						<Card
							key={announcement.id}
							sx={{
								backgroundColor: "#1e2227",
								textAlign: "left",
								color: "#e2e2e2",
								padding: "1rem",
								height: "fit-content",
							}}
							elevation={10}
						>
							<CardContent>
								<Typography variant="h5" component="div">
									{announcement.title}
								</Typography>
								<Typography variant="body2">{announcement.content}</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollWindow>
		</div>
	);
}

export default AnnouncementsGrid;
