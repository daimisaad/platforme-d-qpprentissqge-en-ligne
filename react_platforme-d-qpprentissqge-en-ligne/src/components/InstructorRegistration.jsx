import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleInstructorRegistration, setInstructorStatus } from '../store/uiSlice';

export function InstructorRegistration() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.isInstructorRegistrationOpen);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    idCardFront: null,
    idCardBack: null,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (to be implemented with your backend)
    // For now, we'll simulate approval
    dispatch(setInstructorStatus(true));
    dispatch(toggleInstructorRegistration());
  };

  const handleFileChange = (e, side) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        [side === 'front' ? 'idCardFront' : 'idCardBack']: e.target.files[0]
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={() => dispatch(toggleInstructorRegistration())}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-black text-center mb-8">Instructor Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              ID Card (Front)
            </label>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center">
              <input
                type="file"
                required
                accept="image/*"
                className="hidden"
                id="idCardFront"
                onChange={(e) => handleFileChange(e, 'front')}
              />
              <label
                htmlFor="idCardFront"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.idCardFront ? formData.idCardFront.name : 'Click to upload front side'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              ID Card (Back)
            </label>
            <div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center">
              <input
                type="file"
                required
                accept="image/*"
                className="hidden"
                id="idCardBack"
                onChange={(e) => handleFileChange(e, 'back')}
              />
              <label
                htmlFor="idCardBack"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-sm text-gray-500">
                  {formData.idCardBack ? formData.idCardBack.name : 'Click to upload back side'}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}