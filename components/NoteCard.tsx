import Link from 'next/link';
import { format } from 'date-fns';

interface Note {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="block industrial-box hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-lg font-bold uppercase tracking-wide chrome-text">
          {note.title}
        </h2>
        <div className="text-xs data-display whitespace-nowrap ml-4 font-bold">
          <div>{format(new Date(note.created_at), 'yyyy.MM.dd')}</div>
          {note.updated_at !== note.created_at && (
            <div className="text-gray-500 mt-1">
              UPD: {format(new Date(note.updated_at), 'MM.dd')}
            </div>
          )}
        </div>
      </div>

      {note.excerpt && (
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {note.excerpt}
        </p>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-bold uppercase tracking-wide bg-gray-800 text-gray-100 border border-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 font-bold">
        <div className="w-1 h-1 bg-blue-500"></div>
        <span>VIEW NOTE</span>
      </div>
    </Link>
  );
}
