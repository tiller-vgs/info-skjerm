import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAnnouncements } from "../hooks/announcementsDummydata";

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
    <>
      <Typography variant="h4">Kunngjøringer</Typography>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {announcements?.map((announcement) => (
          <Card
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
    </>
  );
}

export default AnnouncementsGrid;
