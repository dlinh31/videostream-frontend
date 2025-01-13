'use client'

import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Video = {
  name: string
  path: string
}

const Homepage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>(
          'http://localhost:8080/api/videos'
        )
        setVideos(response.data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch videos.')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const handlePlay = (videoName: string): void => {
    setCurrentVideo(
      `http://localhost:8080/api/stream?name=${encodeURIComponent(videoName)}`
    )
  }

  return (
    <div className="min-h-screen space-y-8 bg-white p-8 text-black dark:bg-gray-900 dark:text-white">
      <header className="text-center text-4xl font-extrabold">
        Video Streaming App
      </header>

      <main className="mx-auto w-full max-w-4xl space-y-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {currentVideo && (
              <Card>
                <CardHeader>
                  <CardTitle>Now Playing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactPlayer
                    url={currentVideo}
                    controls
                    playing
                    width="100%"
                    height="100%"
                    className="rounded shadow"
                  />
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {videos.map((video, index) => (
                <Card key={index} className="hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>{video.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => handlePlay(video.name)}>Play</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-sm">
        © {new Date().getFullYear()} Video Streaming App
      </footer>
    </div>
  )
}

export default Homepage
