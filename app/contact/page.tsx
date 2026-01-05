import { supabase } from "@/lib/supabase";
import ContactForm from "@/components/ContactForm";
import CommentsSection from "@/components/CommentsSection";

export const revalidate = 30;

async function getApprovedComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .is("post_id", null) // Only get comments for contact page
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data || [];
}

export default async function ContactPage() {
  const comments = await getApprovedComments();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="industrial-box mb-6">
        <div className="industrial-header">Contact</div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Send me a private message or leave a public comment below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Private Contact Form */}
        <div className="industrial-box">
          <div className="industrial-header">PRIVATE CHANNEL</div>
          <p className="text-gray-600 text-xs mb-6 uppercase tracking-wider font-bold">
            (Response by Email)
          </p>
          <ContactForm />
        </div>

        {/* Public Comments Section */}
        <div className="industrial-box industrial-box-silver">
          <div className="industrial-header industrial-header-silver">
            PUBLIC CHANNEL
          </div>
          <p className="text-gray-600 text-xs mb-6 uppercase tracking-wider font-bold">
            (Moderated, Response in Comments)
          </p>
          <CommentsSection postId={null} initialComments={comments} />
        </div>
      </div>
    </div>
  );
}
