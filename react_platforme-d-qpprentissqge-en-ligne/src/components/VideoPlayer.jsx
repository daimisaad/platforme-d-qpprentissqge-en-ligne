import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export function VideoPlayer({ video, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video.url]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-xl font-semibold text-black">{video.title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            autoPlay
            playsInline
            src={video.url}
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6">
          <h4 className="font-semibold text-lg text-black mb-2">About this video</h4>
          <p className="text-gray-700 leading-relaxed">{video.description}</p>
          <div className="mt-4 text-sm text-gray-600">
            Duration: {video.duration}
          </div>
        </div>
      </div>
    </div>
  );
}