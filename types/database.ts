export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          type: 'blog' | 'tweet' | 'note'
          tags: string[] | null
          created_at: string
          updated_at: string
          published: boolean
          slug: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          type: 'blog' | 'tweet' | 'note'
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published?: boolean
          slug: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          type?: 'blog' | 'tweet' | 'note'
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published?: boolean
          slug?: string
        }
      }
      reactions: {
        Row: {
          id: string
          post_id: string
          emoji: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          emoji: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          emoji?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string | null
          name: string
          message: string
          created_at: string
          parent_id: string | null
          status: 'pending' | 'approved' | 'rejected'
          reply_from_admin: string | null
        }
        Insert: {
          id?: string
          post_id?: string | null
          name: string
          message: string
          created_at?: string
          parent_id?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reply_from_admin?: string | null
        }
        Update: {
          id?: string
          post_id?: string | null
          name?: string
          message?: string
          created_at?: string
          parent_id?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reply_from_admin?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
          status: 'new' | 'read' | 'archived'
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
          status?: 'new' | 'read' | 'archived'
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
          status?: 'new' | 'read' | 'archived'
        }
      }
    }
  }
}
