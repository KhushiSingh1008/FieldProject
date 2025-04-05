import React, { useState, useEffect } from 'react';
import { Course } from '../Types/Course';
import CourseCard from '../components/CourseCard';
import react from '../assets/CourseImage/react.png';
import stress from '../assets/CourseImage/stress.png';
import ts from '../assets/CourseImage/ts.png';
import yoga from '../assets/CourseImage/yoga.png';
import caligraphy from '../assets/CourseImage/caligraphy.png';
import healthycook from '../assets/CourseImage/healthycook.png';
import meditaiotn from '../assets/CourseImage/meditaiotn.png';
import posPar from '../assets/CourseImage/posPar.png';
import pottery from '../assets/CourseImage/pottery.png';
import pubspeak from '../assets/CourseImage/pubspeak.png';
import './SearchPage.css';

// Mock data (replace with your actual course data)
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    instructor: 'Jane Smith',
    location: 'Mumbai',
    level: 'Beginner',
    duration: '6 weeks',
    description: 'Learn React from scratch',
    price: 49.99,
    rating: 4.7,
    category: 'Web Development',
    detailedDescription: 'This course will teach you everything you need to know to start building applications with React. We cover components, state, props, hooks, and more.',
    imageUrl: react,
  },

  {
    id: '2',
    title: 'Advanced TypeScript',
    instructor: 'John Doe',
    location: 'Pune',
    description: 'Master advanced TypeScript concepts for large-scale applications',
    duration: '8 weeks',
    level: 'Advanced',
    imageUrl: ts,
    price: 59.99,
    rating: 4.9,
    category: 'Web Development',
    detailedDescription: 'Take your TypeScript skills to the next level with advanced type system features, decorators, and patterns for large applications.',
  },
  {
    "id": "3",
    "title": "Yoga for Beginners",
    "instructor": "Emily Green",
    "location": 'Bangalore',
    "description": "A gentle introduction to yoga for relaxation and flexibility.",
    "duration": "4 weeks",
    "level": "Beginner",
    "imageUrl": yoga,
    "price": 39.99,
    "rating": 4.8,
    "category": "Health & Wellness",
    "detailedDescription": "This course guides you through basic yoga postures, breathing exercises, and mindfulness techniques to help you improve flexibility, strength, and inner calm.",
  },
  {
    "id": "4",
    "title": "Positive Parenting Strategies",
    "instructor": "Sarah Johnson",
    "location": 'Chennai',
    "description": "Learn effective parenting techniques to nurture confident and happy children.",
    "duration": "6 weeks",
    "level": "Intermediate",
    "imageUrl": posPar,
    "price": 49.99,
    "rating": 4.7,
    "category": "Parenting",
    "detailedDescription": "Discover practical strategies for positive discipline, communication, and fostering strong parent-child relationships.",
  },
  {
    "id": "5",
    "title": "Pottery for Beginners",
    "instructor": "Michael Clay",
    "location": 'Delhi',
    "description": "Discover the joy of shaping clay into beautiful pottery.",
    "duration": "5 weeks",
    "level": "Beginner",
    "imageUrl": pottery,
    "price": 44.99,
    "rating": 4.6,
    "category": "Arts & Crafts",
    "detailedDescription": "This course introduces you to hand-building and wheel techniques to create unique ceramic pieces.",
  },
  {
    "id": "6",
    "title": "Stress Management and Mindfulness",
    "instructor": "David White",
    "location": 'Hyderabad',
    "description": "Learn how to reduce stress and cultivate mindfulness in daily life.",
    "duration": "4 weeks",
    "level": "Beginner",
    "imageUrl": stress,
    "price": 39.99,
    "rating": 4.9,
    "category": "Personal Development",
    "detailedDescription": "This course explores relaxation techniques, mindfulness practices, and coping mechanisms to handle stress effectively.",
  },
  {
    "id": "7",
    "title": "The Art of Calligraphy",
    "instructor": "Sophia Brown",
    "location": 'Ahmedabad',
    "description": "Master the beautiful art of modern calligraphy and lettering.",
    "duration": "6 weeks",
    "level": "Beginner",
    "imageUrl": caligraphy,
    "price": 42.99,
    "rating": 4.8,
    "category": "Arts & Crafts",
    "detailedDescription": "Learn various calligraphy styles, from brush lettering to traditional scripts, and create stunning works of art.",
  },
  {
    "id": "8",
    "title": "Meditation for Inner Peace",
    "instructor": "Dr. Alan Reed",
    "location": 'Surat',
    "description": "A step-by-step guide to developing a peaceful meditation practice.",
    "duration": "5 weeks",
    "level": "Beginner",
    "imageUrl": meditaiotn,
    "price": 34.99,
    "rating": 4.9,
    "category": "Health & Wellness",
    "detailedDescription": "Learn how to use meditation techniques to cultivate relaxation, reduce anxiety, and enhance focus.",
  },
  {
    "id": "9",
    "title": "Public Speaking Mastery",
    "instructor": "Chris Evans",
    "location": 'Thane',
    "description": "Develop confidence and master the art of public speaking.",
    "duration": "6 weeks",
    "level": "Intermediate",
    "imageUrl": pubspeak,
    "price": 49.99,
    "rating": 4.7,
    "category": "Personal Development",
    "detailedDescription": "Enhance your communication skills with proven techniques to speak with confidence and impact.",
  },
  {
    "id": "10",
    "title": "Healthy Cooking Made Easy",
    "instructor": "Laura James",
    "location": 'Ghatkopar',
    "description": "Learn how to prepare nutritious and delicious meals at home.",
    "duration": "5 weeks",
    "level": "Beginner",
    "imageUrl": healthycook,
    "price": 44.99,
    "rating": 4.8,
    "category": "Food & Nutrition",
    "detailedDescription": "Discover easy-to-make, healthy recipes and cooking techniques that fit your lifestyle.",
  }
  // Add more mock courses as needed
];

const SearchPage: React.FC = () => {
  const [allCourses] = useState<Course[]>(mockCourses); // Using mock data
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('default');

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let results = [...allCourses];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        (course.instructor && course.instructor.toLowerCase().includes(term))
      );
    }

    // Location filter
    if (selectedLocation !== 'All') {
      results = results.filter(course => course.location === selectedLocation);
    }

    // Level filter
    if (selectedLevel !== 'All') {
      results = results.filter(course => course.level === selectedLevel);
    }

    // Sorting
    switch (sortOption) {
      case 'price-high-low':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'price-low-high':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        results.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredCourses(results);
  }, [searchTerm, selectedLocation, selectedLevel, sortOption, allCourses]);

  // Get unique filter options
  const locations = ['All', ...new Set(allCourses.map(c => c.location).filter(Boolean))];
  const levels = ['All', ...new Set(allCourses.map(c => c.level).filter(Boolean))];

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Find Your Perfect Course</h1>
        
        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filters">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-container">
        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            {searchTerm || selectedLocation !== 'All' || selectedLevel !== 'All' 
              ? "No courses match your search criteria."
              : "No courses available."}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;