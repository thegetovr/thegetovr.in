import AnnouncementsManager from "@/components/admin/announcements/AnnouncementsManager";

export const metadata = {
  title: "Announcements | The Getovr Admin",
};

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Announcements</h1>

        <p className="mt-2 text-zinc-400">
          Manage the announcements displayed above your website navbar.
        </p>
      </div>

      <AnnouncementsManager />
    </div>
  );
}
