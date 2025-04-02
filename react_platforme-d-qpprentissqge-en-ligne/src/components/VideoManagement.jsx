import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, Filter, Trash2, Edit3, Play, 
  ThumbsUp, ThumbsDown, MessageSquare, Bell,
  Award, Clock, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  updateVideo, 
  deleteVideo, 
  toggleVideoLike,
  toggleSubscription,
  updateStats
} from '../store/coursesSlice';
import { setVideoFilter, unlockBadge } from '../store/uiSlice';
import { VideoPlayer } from './VideoPlayer';

export function VideoManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInstructor = useSelector(state => state.ui.isInstructor);
  const courses = useSelector(state => state.courses.courses);
  const videoFilter = useSelector(state => state.ui.videoFilter);
  const videoStats = useSelector(state => state.courses.videoStats);
  const userProgress = useSelector(state => state.ui.userProgress);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(updateStats());
  }, [dispatch]);

  const allVideos = courses.flatMap(course => 
    course.videos.map(video => ({
      ...video,
      courseTitle: course.title,
      courseId: course.id
    }))
  );

  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(videoFilter.search.toLowerCase());
    const matchesCourse = videoFilter.course === 'all' || video.courseId === videoFilter.course;
    const matchesStatus = videoFilter.status === 'all' || video.status === videoFilter.status;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleDelete = (video) => {
    dispatch(deleteVideo({ courseId: video.courseId, videoId: video.id }));
    setShowDeleteConfirm(null);
    dispatch(updateStats());
  };

  const handleStatusChange = (video, status) => {
    dispatch(updateVideo({
      courseId: video.courseId,
      videoId: video.id,
      updates: { status }
    }));
    setEditingVideo(null);
    dispatch(updateStats());
  };

  const handleLike = (video, isLike) => {
    dispatch(toggleVideoLike({
      courseId: video.courseId,
      videoId: video.id,
      isLike
    }));
    
    // Check for badge unlock
    if (isLike && video.likes >= 9) {
      dispatch(unlockBadge('engaged'));
    }
    dispatch(updateStats());
  };

  const handleSubscribe = (video) => {
    dispatch(toggleSubscription({
      courseId: video.courseId,
      videoId: video.id,
      userId: 'current-user' // In a real app, this would be the actual user ID
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {isInstructor && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Video Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <Eye className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">{videoStats.totalViews}</span>
                </div>
                <p className="text-purple-900 mt-2">Total Views</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <ThumbsUp className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">{videoStats.totalLikes}</span>
                </div>
                <p className="text-purple-900 mt-2">Total Likes</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-600">{videoStats.totalComments}</span>
                </div>
                <p className="text-purple-900 mt-2">Total Comments</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search videos..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={videoFilter.search}
                    onChange={(e) => dispatch(setVideoFilter({ search: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  value={videoFilter.course}
                  onChange={(e) => dispatch(setVideoFilter({ course: e.target.value }))}
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
                {isInstructor && (
                  <select
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={videoFilter.status}
                    onChange={(e) => dispatch(setVideoFilter({ status: e.target.value }))}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                )}
                <button
                  onClick={() => navigate('/upload')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Upload Video
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  {isInstructor && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover rounded"
                          />
                          {userProgress[video.id] && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                              <div
                                className="h-full bg-purple-600"
                                style={{ width: `${userProgress[video.id]}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{video.title}</div>
                          <div className="text-sm text-gray-500">{video.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{video.courseTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{video.uploadDate}</td>
                    {isInstructor && (
                      <td className="px-6 py-4">
                        {editingVideo?.id === video.id ? (
                          <select
                            value={video.status}
                            onChange={(e) => handleStatusChange(video, e.target.value)}
                            className="text-sm border border-gray-200 rounded px-2 py-1"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            video.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {video.status}
                          </span>
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {video.views}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {video.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {video.comments?.length || 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedVideo(video)}
                          className="text-purple-600 hover:text-purple-700"
                          title="Play"
                        >
                          <Play className="w-5 h-5" />
                        </button>
                        {!isInstructor && (
                          <>
                            <button
                              onClick={() => handleLike(video, true)}
                              className="text-gray-400 hover:text-purple-600"
                              title="Like"
                            >
                              <ThumbsUp className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleLike(video, false)}
                              className="text-gray-400 hover:text-purple-600"
                              title="Dislike"
                            >
                              <ThumbsDown className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleSubscribe(video)}
                              className={`${
                                video.subscribers.includes('current-user')
                                  ? 'text-purple-600'
                                  : 'text-gray-400 hover:text-purple-600'
                              }`}
                              title="Subscribe"
                            >
                              <Bell className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        {isInstructor && (
                          <>
                            <button
                              onClick={() => setEditingVideo(video)}
                              className="text-blue-600 hover:text-blue-700"
                              title="Edit"
                            >
                              <Edit3 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(video)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-black mb-4">Delete Video?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}