'use client';

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    // Reset previous states
    setError("");
    setSuccess(false);
    
    // Validate URL
    if (!playlistUrl) {
      setError("Please enter a YouTube Playlist URL");
      return;
    }
    
    if (!playlistUrl.includes('youtube.com/playlist') && !playlistUrl.includes('youtu.be/playlist')) {
      setError("Please enter a valid YouTube Playlist URL");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`/api/playlist?url=${encodeURIComponent(playlistUrl)}`, {
        responseType: "blob",
      });

      // Check if response is actually an error
      if (response.headers['content-type'] === 'application/json') {
        const errorText = await response.data.text();
        const errorObj = JSON.parse(errorText);
        throw new Error(errorObj.error || "Failed to fetch playlist data");
      }

      // Create a link element to download the Excel file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = "youtube-playlist.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      setSuccess(true);
      
      // Clear input field after successful download
      setPlaylistUrl("");
    } catch (err: unknown) {
      console.error("Download error:", err);
      if (axios.isAxiosError(err) && err.response?.data) {
        // Handle error response from our API
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const result = reader.result;
            if (typeof result === 'string') {
              const errorObj = JSON.parse(result);
              setError(errorObj.error || "Error occurred while processing the playlist. Please try again.");
            } else {
              setError("Error occurred while processing the playlist. Please try again.");
            }
          } catch (parseErr) {
            setError("Error occurred while processing the playlist. Please try again.");
          }
        };
        reader.readAsText(err.response.data);
      } else if (err instanceof Error) {
        setError(err.message || "Error occurred while downloading the file. Please try again.");
      } else {
        setError("Error occurred while downloading the file. Please try again.");
      }
    } finally {
      setLoading(false);
      
      // Hide success message after 5 seconds
      if (success) {
        setTimeout(() => setSuccess(false), 5000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">YouTube Playlist to Excel</h1>
        
        <div className="mb-6">
          <label htmlFor="playlistUrl" className="block text-gray-700 text-sm font-bold mb-2">
            YouTube Playlist URL
          </label>
          <input
            id="playlistUrl"
            type="text"
            placeholder="https://www.youtube.com/playlist?list=..."
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={loading}
          />
        </div>
        
        <button 
          onClick={handleDownload} 
          disabled={loading}
          className={`w-full py-3 px-4 rounded font-bold text-white ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } transition duration-300 ease-in-out`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Download Excel"
          )}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Playlist downloaded successfully!
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold">Instructions:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Copy the URL of any YouTube playlist</li>
            <li>Paste it in the input field above</li>
            <li>Click "Download Excel" to get the playlist data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}