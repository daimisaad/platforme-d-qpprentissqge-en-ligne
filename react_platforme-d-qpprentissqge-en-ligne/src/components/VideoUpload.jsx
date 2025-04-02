import React, { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addVideoToCourse } from '../store/coursesSlice';

export function VideoUpload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    video: null,
    courseId: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Simulate API call
    setTimeout(() => {
      const newVideo = {
        id: `v${Date.now()}`,
        title: formData.title,
        description: formData.description,
        thumbnail: previewUrl,
        url: URL.createObjectURL(formData.video),
        duration: '00:00' // This would normally be calculated from the video
      };

      dispatch(addVideoToCourse({
        courseId: formData.courseId,
        video: newVideo
      }));

      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/course/${formData.courseId}`);
      }, 2000);
    }, 5000);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
      
      if (type === 'thumbnail') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-purple-600 hover:text-purple-700 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-black mb-8">Upload New Video</h1>
          
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
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-4">
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
                  className="cursor-pointer block"
                >
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        <span className="text-white">Change thumbnail</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-purple-600 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload thumbnail</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Video File
              </label>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-4">
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
                  className="cursor-pointer block"
                >
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-purple-600 mb-2" />
                    <span className="text-sm text-gray-500">
                      {formData.video ? formData.video.name : 'Click to upload video'}
                    </span>
                  </div>
                </label>
              </div>
              {uploadProgress > 0 && (
                <div className="mt-2">
                  <div className="h-2 bg-purple-100 rounded-full">
                    <div
                      className="h-2 bg-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-purple-600 mt-1">{uploadProgress}% uploaded</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Upload Video
            </button>
          </form>

          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-purple-600 text-4xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-black mb-2">Upload Successful!</h3>
                <p className="text-gray-600">Redirecting to course page...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}