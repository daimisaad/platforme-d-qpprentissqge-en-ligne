import React from 'react';
import { PlayCircle, Video } from 'lucide-react';

export function CourseCard({ course, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-black">{course.title}</h3>
          <div className="flex items-center space-x-2">
            <Video className="text-purple-600 w-5 h-5" />
            <span className="text-purple-600 font-medium">{course.videos.length}</span>
          </div>
        </div>
        <p className="text-black/70 text-sm line-clamp-2 mb-3">{course.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-purple-600 text-sm">By {course.instructor}</p>
          <PlayCircle className="text-purple-600 w-6 h-6" />
        </div>
      </div>
    </div>
  );
}