import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, message, postId } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Missing name or message' },
        { status: 400 }
      );
    }

    // Insert the comment with pending status
    const { error } = await supabase
      .from('comments')
      .insert([{
        name: name.trim(),
        message: message.trim(),
        post_id: postId || null,
        status: 'pending' as const,
      }]);

    if (error) {
      console.error('Error inserting comment:', error);
      return NextResponse.json(
        { error: 'Failed to save comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing comment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
