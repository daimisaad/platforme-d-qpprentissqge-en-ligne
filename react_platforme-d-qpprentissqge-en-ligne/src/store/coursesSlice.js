import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
    {
      id: '1',
      title: 'Modern Web Development',
      description: 'Master the latest web technologies and frameworks to build modern, responsive web applications.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
      instructor: 'Sarah Johnson',
      category: 'frontend',
      videos: [
        {
          id: 'v1',
          title: 'Introduction to Modern Web Development',
          description: 'Learn the fundamentals of modern web development and set up your development environment.',
          thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=800',
          url: 'https://example.com/video1.mp4',
          duration: '15:30',
          uploadDate: '2024-03-15',
          status: 'published',
          views: 1250,
          likes: 89,
          dislikes: 3,
          comments: [],
          subscribers: []
        },
        {
          id: 'v2',
          title: 'Introduction to Modern Web Development',
          description: 'Learn the fundamentals of modern web development and set up your development environment.',
          thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&q=80&w=800',
          url: 'https://example.com/video1.mp4',
          duration: '15:30',
          uploadDate: '2024-03-15',
          status: 'published',
          views: 1250,
          likes: 89,
          dislikes: 3,
          comments: [],
          subscribers: []
        }
      ]
    },
    {
      id: '1',
      title: 'Modern Web Development',
      description: 'Master the latest web technologies and frameworks to build modern, responsive web applications.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
      instructor: 'Sarah Johnson',
      category: 'backend',
      videos: []
    }
  ],
  videoStats: {
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  }
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    addVideoToCourse: (state, action) => {
      const { courseId, video } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.videos.push({
          ...video,
          status: 'draft',
          views: 0,
          likes: 0,
          dislikes: 0,
          comments: [],
          subscribers: [],
          uploadDate: new Date().toISOString().split('T')[0]
        });
      }
    },
    updateVideo: (state, action) => {
      const { courseId, videoId, updates } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const video = course.videos.find(v => v.id === videoId);
        if (video) {
          Object.assign(video, updates);
        }
      }
    },
    deleteVideo: (state, action) => {
      const { courseId, videoId } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        course.videos = course.videos.filter(v => v.id !== videoId);
      }
    },
    toggleVideoLike: (state, action) => {
      const { courseId, videoId, isLike } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const video = course.videos.find(v => v.id === videoId);
        if (video) {
          if (isLike) {
            video.likes += 1;
          } else {
            video.dislikes += 1;
          }
        }
      }
    },
    addComment: (state, action) => {
      const { courseId, videoId, comment } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const video = course.videos.find(v => v.id === videoId);
        if (video) {
          video.comments.push({
            id: Date.now().toString(),
            ...comment,
            timestamp: new Date().toISOString(),
            replies: []
          });
        }
      }
    },
    addReply: (state, action) => {
      const { courseId, videoId, commentId, reply } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const video = course.videos.find(v => v.id === videoId);
        if (video) {
          const comment = video.comments.find(c => c.id === commentId);
          if (comment) {
            comment.replies.push({
              id: Date.now().toString(),
              ...reply,
              timestamp: new Date().toISOString()
            });
          }
        }
      }
    },
    toggleSubscription: (state, action) => {
      const { courseId, videoId, userId } = action.payload;
      const course = state.courses.find(c => c.id === courseId);
      if (course) {
        const video = course.videos.find(v => v.id === videoId);
        if (video) {
          const index = video.subscribers.indexOf(userId);
          if (index === -1) {
            video.subscribers.push(userId);
          } else {
            video.subscribers.splice(index, 1);
          }
        }
      }
    },
    updateStats: (state) => {
      const stats = {
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0
      };
      
      state.courses.forEach(course => {
        course.videos.forEach(video => {
          stats.totalViews += video.views;
          stats.totalLikes += video.likes;
          stats.totalComments += video.comments.length;
        });
      });
      
      state.videoStats = stats;
    }
  },
});

export const {
  addCourse,
  addVideoToCourse,
  updateVideo,
  deleteVideo,
  toggleVideoLike,
  addComment,
  addReply,
  toggleSubscription,
  updateStats
} = coursesSlice.actions;

export default coursesSlice.reducer;