import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import PostList from './PostList'
import axios from 'axios'
import '@testing-library/jest-dom'

jest.mock('axios')

describe('PostList Component', () => {
  const mockPosts = [
    {
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays loading message while fetching data', () => {
    axios.get.mockImplementation(() => new Promise(() => {}))

    render(<PostList />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Loading posts...')).toBeInTheDocument()
  })

  it('displays posts when data is fetched successfully', async () => {
    axios.get.mockResolvedValue({ data: mockPosts })

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByTestId('post-list')).toBeInTheDocument()
      expect(screen.getAllByTestId(/post-\d+/)).toHaveLength(2)
      
      expect(screen.getByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')).toBeInTheDocument()
      expect(screen.getByText('qui est esse')).toBeInTheDocument()
      
      expect(screen.getByText(/quia et suscipit/)).toBeInTheDocument()
      expect(screen.getByText(/est rerum tempore vitae/)).toBeInTheDocument()
    })
  })

  it('displays error message when data fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(
        screen.getByText('Failed to fetch posts. Please try again later.')
      ).toBeInTheDocument()
    })
  })
})