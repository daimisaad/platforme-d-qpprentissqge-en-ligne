import React, { useState } from 'react';
import { X, Play, Clock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VideoPlayer } from './VideoPlayer';

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const course = useSelector(state => 
    state.courses.courses.find(c => c.id === courseId)
  );

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-purple-600 hover:text-purple-700 flex items-center"
        >
          <X className="w-5 h-5 mr-2" />
          Back to Courses
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-white/90 text-lg">{course.description}</p>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=6366f1&color=fff`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="text-lg font-medium text-black">{course.instructor}</p>
                </div>
              </div>
              <div className="bg-purple-100 px-4 py-2 rounded-full">
                <span className="text-purple-800 font-medium">
                  {course.videos.length} {course.videos.length === 1 ? 'video' : 'videos'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-black mb-4">Course Content</h2>
              {course.videos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No videos available yet.</p>
                </div>
              ) : (
                course.videos.map((video) => (
                  <div 
                    key={video.id}
                    className="bg-white border border-purple-100 rounded-lg p-4 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="relative w-48 h-32 flex-shrink-0 cursor-pointer group"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center rounded-lg">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black mb-2">{video.title}</h3>
                        <p className="text-gray-600 mb-3">{video.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-purple-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{video.duration}</span>
                          </div>
                          <button 
                            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            onClick={() => setSelectedVideo(video)}
                          >
                            <Play className="w-4 h-4" />
                            Watch Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
}