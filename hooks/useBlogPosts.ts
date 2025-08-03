import { useState, useEffect } from 'react'

interface BlogPost {
  id: string
  title: string
  content: string
  createdAt: string
  author?: {
    name: string;
  };
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = async (title: string, content: string) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) throw new Error('Failed to create post')
      
      const newPost = await response.json()
      setPosts(prev => [newPost, ...prev])
      return newPost
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create post')
    }
  }

  const deletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')
      
      setPosts(prev => prev.filter(post => post.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    deletePost
  }
}