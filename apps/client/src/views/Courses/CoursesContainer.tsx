import { useNavigate, useParams } from "react-router-dom";
import Courses from "./Courses";
import LessonDetail from "@/components/Course/LessonDetail";
import CourseDetail from "@/components/Course/CourseDetail";
import { useCoursesStore } from "@/store/useCoursesStore";

export default function CoursesContainer() {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const { 
    getCourses,
    createCourse,
    courses,
    isLoading,
    error,
    clearError
  } = useCoursesStore();

  // Navegação
  const handleCourseSelect = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleBack = () => {
    if (lessonId) {
      navigate(`/courses/${courseId}`);
    } else {
      navigate('/courses');
    }
  };

  if (lessonId && courseId) {
    return (
      <LessonDetail
        courseId={courseId}
        lessonId={lessonId}
        onBack={handleBack}
      />
    );
  }

  if (courseId) {
    return (
      <CourseDetail
        courseId={courseId}
        onBack={handleBack}
      />
    );
  }

  return (
    <Courses
      onCourseSelect={handleCourseSelect}
      courses={courses}
      isLoading={isLoading}
      error={error}
      getCourses={getCourses}
      createCourse={createCourse}
      clearError={clearError}
    />
  );
}