import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Navbar } from './components/Navbar';
import { CourseList } from './components/CourseList';
import { CourseDetail } from './components/CourseDetail';
import { InstructorRegistration } from './components/InstructorRegistration';
import { VideoUpload } from './components/VideoUpload';
import { VideoManagement } from './components/VideoManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<CourseList />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/upload" element={<VideoUpload />} />
              <Route path="/manage" element={<VideoManagement />} />
            </Routes>
          </main>
          <InstructorRegistration />
        </div>
      </Router>
    </Provider>
  );
}

export default App;