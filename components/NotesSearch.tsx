'use client';

import { useState, useMemo } from 'react';
import NoteCard from './NoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export default function NotesSearch({ notes }: { notes: Note[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      if (note.tags) {
        note.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [notes]);

  // Filter notes based on search query and selected tag
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        searchQuery === '' ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === null || (note.tags && note.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, selectedTag]);

  return (
    <>
      {/* Search input */}
      <div className="industrial-box mb-6">
        <div className="inset-panel">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH NOTES..."
            className="w-full bg-transparent border-none outline-none text-sm font-bold uppercase tracking-wide placeholder-gray-500"
          />
        </div>
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="industrial-box mb-6">
          <div className="industrial-header text-xs mb-3">FILTER BY TAG</div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wide border transition-all ${
                selectedTag === null
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              ALL
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wide border transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      {(searchQuery || selectedTag) && (
        <div className="mb-4 text-xs uppercase tracking-wider data-display font-bold">
          <span className="text-blue-500">{filteredNotes.length}</span>{' '}
          {filteredNotes.length === 1 ? 'RESULT' : 'RESULTS'} FOUND
        </div>
      )}

      {/* Results */}
      {filteredNotes.length === 0 ? (
        <div className="industrial-box text-center">
          <div className="inset-panel">
            <p className="uppercase tracking-wider data-display mb-2 font-bold">
              NO RESULTS FOUND
            </p>
            <p className="text-gray-600 text-xs">
              {searchQuery || selectedTag
                ? 'TRY ADJUSTING YOUR SEARCH CRITERIA'
                : 'NO NOTES AVAILABLE'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </>
  );
}
