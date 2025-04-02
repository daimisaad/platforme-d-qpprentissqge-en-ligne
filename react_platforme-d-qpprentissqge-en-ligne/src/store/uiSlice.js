import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isInstructorRegistrationOpen: false,
  searchQuery: '',
  selectedCategory: 'all',
  isInstructor: false,
  videoFilter: {
    search: '',
    course: 'all',
    status: 'all'
  },
  userProgress: {},
  userBadges: {
    engaged: false,
    superFan: false,
    topCommenter: false
  },
  instructor: {
    name: 'Sarah Johnson',
    bio: 'Experienced web developer and educator with a passion for teaching modern web technologies.',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleInstructorRegistration: (state) => {
      state.isInstructorRegistrationOpen = !state.isInstructorRegistrationOpen;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setInstructorStatus: (state, action) => {
      state.isInstructor = action.payload;
    },
    setVideoFilter: (state, action) => {
      state.videoFilter = { ...state.videoFilter, ...action.payload };
    },
    updateVideoProgress: (state, action) => {
      const { videoId, progress } = action.payload;
      state.userProgress[videoId] = progress;
    },
    unlockBadge: (state, action) => {
      state.userBadges[action.payload] = true;
    },
    updateInstructorProfile: (state, action) => {
      state.instructor = { ...state.instructor, ...action.payload };
    }
  },
});

export const { 
  toggleInstructorRegistration,
  setSearchQuery,
  setSelectedCategory,
  setInstructorStatus,
  setVideoFilter,
  updateVideoProgress,
  unlockBadge,
  updateInstructorProfile
} = uiSlice.actions;

export default uiSlice.reducer;