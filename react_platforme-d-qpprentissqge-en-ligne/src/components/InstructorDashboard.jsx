import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Trash2, Edit3, Play, 
  ThumbsUp, ThumbsDown, MessageSquare, Bell,
  Award, Clock, Eye, Settings, LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  updateVideo, 
  deleteVideo, 
  toggleVideoLike,
  toggleSubscription,
  updateStats
} from '../store/coursesSlice';
import { setVideoFilter, unlockBadge } from '../store/uiSlice';
import { VideoPlayer } from './VideoPlayer';
import { InstructorProfile } from './InstructorProfile';

export function InstructorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInstructor = useSelector(state => state.ui.isInstructor);
  const courses = useSelector(state => state.courses.courses);
  const videoFilter = useSelector(state => state.ui.videoFilter);
  const videoStats = useSelector(state => state.courses.videoStats);
  const userProgress = useSelector(state => state.ui.userProgress);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    dispatch(updateStats());
  }, [dispatch]);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'devops', name: 'DevOps' }
  ];

  const allVideos = courses.flatMap(course => 
    course.videos.map(video => ({
      ...video,
      courseTitle: course.title,
      courseId: course.id,
      category: course.category
    }))
  );

  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(videoFilter.search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || video.category === activeCategory;
    const matchesStatus = videoFilter.status === 'all' || video.status === videoFilter.status;
    return matchesSearch && matchesCategory && matchesStatus;
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
    dispatch(updateStats());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Award className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-black">Instructor</span>
          </div>
          
          <nav className="space-y-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors flex items-center space-x-2 mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <Eye className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{videoStats.totalViews}</span>
            </div>
            <p className="text-gray-600 mt-2">Total Views</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <ThumbsUp className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{videoStats.totalLikes}</span>
            </div>
            <p className="text-gray-600 mt-2">Total Likes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <MessageSquare className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{videoStats.totalComments}</span>
            </div>
            <p className="text-gray-600 mt-2">Total Comments</p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={videoFilter.search}
                onChange={(e) => dispatch(setVideoFilter({ search: e.target.value }))}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={videoFilter.status}
              onChange={(e) => dispatch(setVideoFilter({ status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
            <button
              onClick={() => navigate('/upload')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Upload Video</span>
            </button>
          </div>
        </div>

        {/* Videos Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {filteredVideos.map((video) => (
                  <motion.tr
                    key={video.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-32 h-20 flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover rounded-lg"
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(video.uploadDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        video.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : video.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {video.status}
                      </span>
                    </td>
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
                        <button
                          onClick={() => navigate(`/edit/${video.id}`)}
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
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayer
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}

        {showProfile && (
          <InstructorProfile
            onClose={() => setShowProfile(false)}
          />
        )}

        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}