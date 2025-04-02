import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUploadModal } from '../store/uiSlice';

export function VideoUploadModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isUploadModalOpen);
  const courses = useSelector(state => state.courses.courses);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    video: null,
    courseId: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (to be implemented with your backend)
    console.log('Form submitted:', formData);
    dispatch(toggleUploadModal());
  };

  const handleFileChange = (e, type) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        [type]: e.target.files[0]
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        <button
          onClick={() => dispatch(toggleUploadModal())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-black mb-6">Upload New Video</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Video Title
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Select Course
            </label>
            <select
              required
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.courseId}
              onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
            >
              <option value="">Select a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Thumbnail Image
            </label>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center">
              <input
                type="file"
                required
                accept="image/*"
                className="hidden"
                id="thumbnail"
                onChange={(e) => handleFileChange(e, 'thumbnail')}
              />
              <label
                htmlFor="thumbnail"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.thumbnail ? formData.thumbnail.name : 'Click to upload thumbnail'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Video File
            </label>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center">
              <input
                type="file"
                required
                accept="video/*"
                className="hidden"
                id="video"
                onChange={(e) => handleFileChange(e, 'video')}
              />
              <label
                htmlFor="video"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.video ? formData.video.name : 'Click to upload video'}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
}