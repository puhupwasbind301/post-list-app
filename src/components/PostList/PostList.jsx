import React from 'react'

import { useState, useEffect } from 'react'
import axios from 'axios'

const PostList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div data-testid="loading">Loading posts...</div>
  }

  if (error) {
    return <div data-testid="error">{error}</div>
  }

  return (
    <div data-testid="post-list">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id} className="post" data-testid={`post-${post.id}`}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList