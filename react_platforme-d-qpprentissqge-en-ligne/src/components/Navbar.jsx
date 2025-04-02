import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Upload, Edit2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory, toggleInstructorRegistration } from '../store/uiSlice';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'mobile', name: 'Mobile Development' },
  { id: 'devops', name: 'DevOps' },
];

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector(state => state.ui.searchQuery);
  const selectedCategory = useSelector(state => state.ui.selectedCategory);
  const isInstructor = useSelector(state => state.ui.isInstructor);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Menu className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-black">Course Platform</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-purple-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isInstructor && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/upload')}
                  className="p-2 rounded-full text-purple-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  title="Upload Video"
                >
                  <Upload className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigate('/manage')}
                  className="p-2 rounded-full text-purple-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  title="Manage Videos"
                >
                  <Edit2 className="h-6 w-6" />
                </button>
              </div>
            )}
            <button
              onClick={() => dispatch(toggleInstructorRegistration())}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Become an Instructor
            </button>
          </div>
        </div>

        <div className="py-3 flex space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch(setSelectedCategory(category.id))}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-purple-100 text-purple-800'
                  : 'text-black hover:bg-purple-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}