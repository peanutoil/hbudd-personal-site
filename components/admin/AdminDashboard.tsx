'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'comments'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'posts'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'comments'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Comments
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
              <p className="text-gray-600 mb-4">
                This is a basic admin interface for managing your portfolio site. To fully manage your content,
                you can use Supabase&apos;s dashboard directly.
              </p>

              <div className="space-y-4 mt-6">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📝 Managing Blog Posts & Tweets</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    Use the Supabase dashboard to create, edit, and delete posts:
                  </p>
                  <ol className="list-decimal list-inside text-blue-800 text-sm space-y-1 ml-2">
                    <li>Go to your Supabase project dashboard</li>
                    <li>Navigate to Table Editor → posts</li>
                    <li>Click &quot;Insert row&quot; to create new content</li>
                    <li>Set type to &apos;blog&apos; or &apos;tweet&apos;</li>
                    <li>Set published to true when ready</li>
                  </ol>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">💬 Managing Comments</h3>
                  <p className="text-green-800 text-sm mb-2">
                    Approve, reply to, or delete comments:
                  </p>
                  <ol className="list-decimal list-inside text-green-800 text-sm space-y-1 ml-2">
                    <li>Go to Table Editor → comments</li>
                    <li>View pending comments (status = &apos;pending&apos;)</li>
                    <li>Change status to &apos;approved&apos; or &apos;rejected&apos;</li>
                    <li>Add text to reply_from_admin field to reply</li>
                  </ol>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">📧 Viewing Contact Messages</h3>
                  <p className="text-purple-800 text-sm mb-2">
                    Check messages sent via the contact form:
                  </p>
                  <ol className="list-decimal list-inside text-purple-800 text-sm space-y-1 ml-2">
                    <li>Go to Table Editor → messages</li>
                    <li>View all contact form submissions</li>
                    <li>Messages are also sent to your email (if configured)</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">🔧 Quick Links</h3>
                  <div className="space-y-2 mt-2">
                    <a
                      href="https://app.supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-yellow-800 hover:text-yellow-900 font-medium"
                    >
                      → Open Supabase Dashboard
                    </a>
                    <a
                      href="https://resend.com/emails"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-yellow-800 hover:text-yellow-900 font-medium"
                    >
                      → Open Resend Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Post Management</h2>
            <p className="text-gray-600 mb-4">
              To create and manage posts, use the Supabase dashboard. This allows you to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Create new blog posts and tweets</li>
              <li>Edit existing content</li>
              <li>Toggle published status</li>
              <li>Delete posts</li>
              <li>View post statistics</li>
            </ul>
            <a
              href="https://app.supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Open Supabase Dashboard
            </a>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Comment Management</h2>
            <p className="text-gray-600 mb-4">
              Manage comments through the Supabase dashboard:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>View all pending comments</li>
              <li>Approve or reject comments</li>
              <li>Reply to comments as admin</li>
              <li>Delete spam or inappropriate comments</li>
            </ul>
            <a
              href="https://app.supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Open Supabase Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
