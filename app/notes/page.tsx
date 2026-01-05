import { supabase } from "@/lib/supabase";
import NotesSearch from "@/components/NotesSearch";

export const revalidate = 60; // Revalidate every 60 seconds

async function getNotes() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "note")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notes:", error);
    return [];
  }

  return data || [];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="industrial-box mb-6">
        <div className="industrial-header">NOTES ARCHIVE</div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Learnings and technical notes.
        </p>
      </div>

      <NotesSearch notes={notes} />
    </div>
  );
}
