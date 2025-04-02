import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from './CourseCard';

export function CourseList() {
  const navigate = useNavigate();
  const courses = useSelector(state => state.courses.courses);
  const searchQuery = useSelector(state => state.ui.searchQuery);
  const selectedCategory = useSelector(state => state.ui.selectedCategory);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredCourses.map((course) => (
        <CourseCard 
          key={course.id} 
          course={course} 
          onClick={() => navigate(`/course/${course.id}`)}
        />
      ))}
    </div>
  );
}