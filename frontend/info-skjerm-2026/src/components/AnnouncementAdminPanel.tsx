import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { toast } from "react-toastify";
import type { AnnouncementType } from "@types";
import {
  useAnnouncementMutations,
  useAnnouncements,
} from "../hooks/useAnouncements";
import AnnouncementForm from "./AnnouncementForm";

function AnnouncementAdminPanel() {
  const {
    data: announcements,
    isError,
    isLoading,
    isPending,
  } = useAnnouncements();
  const { deleteAnnouncement } = useAnnouncementMutations();
  const [editingAnnouncement, setEditingAnnouncement] = useState<
    AnnouncementType | undefined
  >();

  if (isError) {
    return <div>Feil ved lasting av kunngjøringer.</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] w-full">
      <AnnouncementForm
        initialAnnouncement={editingAnnouncement}
        submitLabel={
          editingAnnouncement ? "Oppdater kunngjøring" : "Lag ny kunngjøring"
        }
        onSubmitted={() => setEditingAnnouncement(undefined)}
      />

      <Paper sx={{ p: 2, backgroundColor: "#1e2227" }}>
        <Typography variant="h5" sx={{ mb: 2, color: "#e2e2e2" }}>
          Eksisterende kunngjøringer
        </Typography>

        {isLoading || isPending ? (
          <div>Laster in kunngjøringer...</div>
        ) : (
          <div className="space-y-3">
            {announcements?.map((announcement) => (
              <Card
                key={announcement.id}
                sx={{ backgroundColor: "#2a2f36", color: "#fff" }}
              >
                <CardContent>
                  <Typography variant="h6">{announcement.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {announcement.content}
                  </Typography>
                  {/* <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 2, opacity: 0.7 }}
                  >
                    {announcement.dateStart} - {announcement.dateEnd}
                  </Typography> */}
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setEditingAnnouncement(announcement)}
                    >
                      Rediger
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={async () => {
                        if (announcement.id == null) {
                          return;
                        }

                        try {
                          await deleteAnnouncement.mutateAsync(announcement.id);
                          toast.success("Kunngjøring slettet!");
                          if (editingAnnouncement?.id === announcement.id) {
                            setEditingAnnouncement(undefined);
                          }
                        } catch (error) {
                          toast.error(
                            error instanceof Error
                              ? error.message
                              : "Kunne ikke slette.",
                          );
                        }
                      }}
                    >
                      Slett
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default AnnouncementAdminPanel;
