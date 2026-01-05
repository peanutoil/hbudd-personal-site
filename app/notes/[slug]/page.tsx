import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 60;

async function getNote(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('type', 'note')
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function NotePage({
  params,
}: {
  params: { slug: string };
}) {
  const note = await getNote(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <article className="industrial-box corner-brackets">
        <header className="mb-8">
          <div className="industrial-header">NOTE</div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold chrome-text uppercase tracking-wider mb-3">
              {note.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500"></div>
                <time dateTime={note.created_at} className="data-display text-xs font-bold">
                  CREATED: {format(new Date(note.created_at), 'yyyy.MM.dd HH:mm')}
                </time>
              </div>

              {note.updated_at !== note.created_at && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500"></div>
                  <time dateTime={note.updated_at} className="data-display text-xs font-bold">
                    UPDATED: {format(new Date(note.updated_at), 'yyyy.MM.dd HH:mm')}
                  </time>
                </div>
              )}
            </div>

            {note.tags && note.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-bold uppercase tracking-wide bg-gray-800 text-gray-100 border border-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
