'use client';

import { useState } from 'react';

interface EmojiReactProps {
  postId: string;
  initialReactions: Record<string, number>;
}

const availableReactions = [
  { id: 'APPROVED', label: 'APPROVED' },
  { id: 'NOTED', label: 'NOTED' },
  { id: 'ARCHIVED', label: 'ARCHIVED' },
  { id: 'CRITICAL', label: 'CRITICAL' },
  { id: 'REVIEWED', label: 'REVIEWED' },
  { id: 'QUERY', label: 'QUERY' },
];

export default function EmojiReact({ postId, initialReactions }: EmojiReactProps) {
  const [reactions, setReactions] = useState<Record<string, number>>(initialReactions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentlyClicked, setRecentlyClicked] = useState<string | null>(null);

  const handleReaction = async (reactionId: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setRecentlyClicked(reactionId);

    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          emoji: reactionId,
        }),
      });

      if (response.ok) {
        // Optimistically update the UI
        setReactions((prev) => ({
          ...prev,
          [reactionId]: (prev[reactionId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error('Error submitting reaction:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setRecentlyClicked(null), 500);
    }
  };

  return (
    <div className="industrial-box industrial-box-silver">
      <div className="industrial-header industrial-header-silver">Reactions</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableReactions.map((reaction) => (
          <button
            key={reaction.id}
            onClick={() => handleReaction(reaction.id)}
            disabled={isSubmitting}
            className={`relative inset-panel hover:bg-white/80 transition-all ${
              recentlyClicked === reaction.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-700 font-bold">
                {reaction.label}
              </span>
              {reactions[reaction.id] > 0 && (
                <span className="data-display text-xs bg-blue-100 px-2 py-1 font-bold">
                  {reactions[reaction.id]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-4 uppercase tracking-wider data-display font-bold">
        ANONYMOUS
      </p>
    </div>
  );
}
