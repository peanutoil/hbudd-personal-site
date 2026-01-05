import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { postId, emoji } = await request.json();

    if (!postId || !emoji) {
      return NextResponse.json(
        { error: 'Missing postId or emoji' },
        { status: 400 }
      );
    }

    // Insert the reaction
    const { error } = await supabase
      .from('reactions')
      .insert([{
        post_id: postId,
        emoji: emoji,
      }]);

    if (error) {
      console.error('Error inserting reaction:', error);
      return NextResponse.json(
        { error: 'Failed to save reaction' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing reaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
