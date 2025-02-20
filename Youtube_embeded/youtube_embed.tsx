import { useState, useEffect } from "react";

interface CardProps {
  title: string; // Title of the card (not used in this component)
  link: string; // YouTube video link
  type: "youtube"; // The type of content (currently supports only YouTube)
}

export function Card({ title, link, type }: CardProps) {
  // Function to extract the YouTube video ID from different types of YouTube URLs
  const getYouTubeThumbnail = () => {
    try {
      let videoId = null; // Initialize videoId as null

      // Check if the link is a standard YouTube video URL
      if (link.includes("youtube.com/watch?v=")) {
        videoId = new URL(link).searchParams.get("v"); // Extract video ID from query parameter
      }
      // Check if the link is a shortened YouTube URL (youtu.be)
      else if (link.includes("youtu.be/")) {
        videoId = link.split("youtu.be/")[1].split("?")[0]; // Extract video ID from the URL path
      }
      // Check if the link is a YouTube Shorts URL
      else if (link.includes("youtube.com/shorts/")) {
        videoId = link.split("youtube.com/shorts/")[1].split("?")[0]; // Extract video ID from the URL path
      }
      // Check if the link is an embedded YouTube video URL
      else if (link.includes("youtube.com/embed/")) {
        videoId = link.split("youtube.com/embed/")[1].split("?")[0]; // Extract video ID from the URL path
      }

      // Construct and return the YouTube thumbnail URL if a valid video ID is found
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;
    } catch {
      return null; // Return null if an error occurs (e.g., invalid URL format)
    }
  };

  return (
    <div>
      <div className="py-2">
        {/* Render the YouTube video thumbnail if the type is "youtube" */}
        {type === "youtube" && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {/* If a valid thumbnail URL is retrieved, display the image */}
            {getYouTubeThumbnail() ? (
              <img
                className="w-full rounded-5xl"
                src={getYouTubeThumbnail()!}
                alt="YouTube Thumbnail"
                onError={(e) => (e.currentTarget.src = defaultImage)} // Fallback in case of a broken image
              />
            ) : (
              <p className="text-red-400">Invalid YouTube URL</p> // Show error message if the link is invalid
            )}
          </a>
        )}
      </div>
    </div>
  );
}
