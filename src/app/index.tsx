'use client';
import { useEffect, useState } from "react";
import axios from "axios";

type Video = {
  name: string;
  path: string;
};

const Homepage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>("http://localhost:8080/api/videos");
        setVideos(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 bg-gray-100">
      {/* Header */}
      <header className="text-3xl font-bold text-center text-gray-800">
        Video Streaming App
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl">
        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <ul className="grid gap-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <span className="text-lg font-medium text-gray-800">{video.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePlay(video.path)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => handleJoinWatchParty(video.name)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Join Watch Party
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="text-sm text-gray-500">
        © {new Date().getFullYear()} Video Streaming App
      </footer>
    </div>
  );
};

const handlePlay = (videoPath: string): void => {
  console.log(`Playing video from path: ${videoPath}`);
  // Add functionality to start video playback here
};

const handleJoinWatchParty = (videoName: string): void => {
  console.log(`Joining watch party for video: ${videoName}`);
  // Add functionality to join a watch party here
};

export default Homepage;
