'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface FeedPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  };
  initialReactions: Record<string, number>;
}

export default function FeedPost({ post, initialReactions }: FeedPostProps) {
  const signalCount = initialReactions['SIGNAL'] || 0;
  const [signals, setSignals] = useState(signalCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReacted, setHasReacted] = useState(false);

  const handleSignal = async () => {
    if (isSubmitting || hasReacted) return;

    setIsSubmitting(true);
    setHasReacted(true);

    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          emoji: 'SIGNAL',
        }),
      });

      if (response.ok) {
        setSignals((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error submitting reaction:', error);
      setHasReacted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="industrial-box">
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {post.content}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <time
          dateTime={post.created_at}
          title={new Date(post.created_at).toLocaleString()}
          className="data-display text-xs font-bold"
        >
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true }).toUpperCase()}
        </time>

        <button
          onClick={handleSignal}
          disabled={isSubmitting || hasReacted}
          className={`flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-wider transition-all font-bold ${
            hasReacted
              ? 'metal-button'
              : 'inset-panel text-gray-700 hover:text-gray-900 hover:bg-white/80'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className={`w-1 h-1 ${hasReacted ? 'bg-white' : 'bg-blue-500'}`}></div>
          <span>SIGNAL</span>
          {signals > 0 && (
            <span className="data-display bg-white/30 px-2 py-0.5">
              {signals}
            </span>
          )}
        </button>
      </div>
    </article>
  );
}
