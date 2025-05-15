import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  ArrowLeft,
  Edit,
  Trash2,
  PlusCircle,
  Check,
} from "lucide-react";
import { useCoursesStore } from "@/store/useCoursesStore";
import { useLessonsStore } from "@/store/useLessonsStore";
import { Lesson } from "@/interfaces/course";
import CourseEditModal from "@/components/Modals/CourseEditModal";
import CourseDeleteModal from "@/components/Modals/CourseDeleteModal";
import LessonAddEditModal from "@/components/Modals/LessonAddEditModal";
import LessonDeleteModal from "@/components/Modals/LessonDeleteModal";
import { useNavbarStore } from "@/store/useNavbarStore";

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export default function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const navigate = useNavigate();
  const {
    course,
    getCourseById,
    isLoading: isLoadingCourse,
    error: courseError,
    updateCourse,
    deleteCourse,
  } = useCoursesStore();
  const {
    getLessonsByCourse,
    createLesson,
    updateLesson,
    deleteLesson,
    isLoading: isLoadingLessons,
    error: lessonError,
  } = useLessonsStore();

  const { setVariant } = useNavbarStore();

  // Estados para modais de curso
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Estados para modais de lição
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showDeleteLessonModal, setShowDeleteLessonModal] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [addingLesson, setAddingLesson] = useState(false);
  const [updatingLesson, setUpdatingLesson] = useState(false);
  const [deletingLesson, setDeletingLesson] = useState(false);

  useEffect(() => {
    getCourseById(courseId);
    getLessonsByCourse(courseId);
    setVariant("light");
  }, [courseId, getCourseById, getLessonsByCourse]);

  const handleLessonClick = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const openEditLessonModal = (lesson: Lesson) => {
    setCurrentLessonId(lesson._id);
    setLessonTitle(lesson.title);
    setLessonVideoUrl(lesson.videoUrl);
    setLessonDescription(lesson.description || "");
    setShowEditLessonModal(true);
  };

  const openDeleteLessonModal = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setShowDeleteLessonModal(true);
  };

  const isLoading = isLoadingCourse || isLoadingLessons;
  const error = courseError || lessonError;

  if (isLoading && !course) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-screen mt-16">
        <p className="text-gray-500">Carregando curso...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen mt-16">
        <p className="text-red-500 mb-4">{error || "Curso não encontrado"}</p>
        <Button onClick={onBack}>Voltar para Cursos</Button>
      </div>
    );
  }

  // Calcular progresso baseado nas aulas concluídas (quando implementar essa funcionalidade)
  const completedLessons = course.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const progressValue = course.lessons.length
    ? (completedLessons / course.lessons.length) * 100
    : 0;

  return (
    <div className="flex-1 flex flex-col min-h-screen mt-16">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Cursos
          </Button>

          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons.length} aulas</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowEditModal(true)}
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardContent className="py-2 px-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Conteúdo do Curso</h2>
                    <Button
                      onClick={() => setShowAddLessonModal(true)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Adicionar Aula
                    </Button>
                  </div>
                  {course.lessons.length === 0 ? (
                    <p className="text-gray-500">
                      Este curso ainda não possui aulas.
                    </p>
                  ) : (
                    <div className="space-y-4 overflow-y-auto max-h-[calc(50vh-100px)]">
                      {course.lessons.map((lesson, index) => (
                        <div
                          key={lesson._id}
                          className="p-4 rounded-lg transition-colors hover:bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                                lesson.completed
                                  ? "bg-green-500"
                                  : "bg-white border border-gray-300"
                              }`}
                            >
                              {lesson.completed ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <span className="text-sm font-medium text-gray-600">
                                  {index + 1}
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                {lesson.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {lesson.description}
                              </p>
                              {lesson.videoUrl && (
                                <p className="text-xs text-green-600 mt-1">
                                  Vídeo disponível
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditLessonModal(lesson)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  openDeleteLessonModal(lesson._id)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLessonClick(lesson._id)}
                                className="ml-2"
                              >
                                Ver Aula
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-6 shadow-sm">
                <CardContent className="py-2 px-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Progresso do Curso
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Aulas Concluídas</span>
                        <span className="text-green-600 font-medium">
                          {completedLessons} de {course.lessons.length}
                        </span>
                      </div>
                      <Progress value={progressValue} className="h-2" />
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Informações do Curso</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons.length} aulas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <CourseEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={async (title, description) => {
          setUpdating(true);
          await updateCourse(courseId, { title, description });
          setUpdating(false);
          setShowEditModal(false);
        }}
        initialTitle={course.title}
        initialDescription={course.description || ""}
        isLoading={updating}
      />

      <CourseDeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          setDeleting(true);
          await deleteCourse(courseId);
          setDeleting(false);
          setShowDeleteModal(false);
          onBack();
        }}
        courseTitle={course.title}
        isLoading={deleting}
      />

      <LessonAddEditModal
        open={showAddLessonModal}
        onClose={() => setShowAddLessonModal(false)}
        onSubmit={async (lessonTitle, lessonVideoUrl, lessonDescription) => {
          setAddingLesson(true);
          await createLesson(
            courseId,
            lessonTitle,
            lessonVideoUrl,
            lessonDescription
          );
          setAddingLesson(false);
          setShowAddLessonModal(false);
          setLessonTitle("");
          setLessonVideoUrl("");
          setLessonDescription("");
          getCourseById(courseId);
        }}
        isLoading={addingLesson}
        isEditMode={false}
      />

      <LessonAddEditModal
        open={showEditLessonModal}
        onClose={() => setShowEditLessonModal(false)}
        onSubmit={async (lessonTitle, lessonVideoUrl, lessonDescription) => {
          if (!currentLessonId) return;
          setUpdatingLesson(true);
          await updateLesson(
            currentLessonId,
            lessonTitle,
            lessonVideoUrl,
            lessonDescription
          );
          setUpdatingLesson(false);
          setShowEditLessonModal(false);
          setCurrentLessonId(null);
          getCourseById(courseId);
        }}
        initialTitle={lessonTitle}
        initialVideoUrl={lessonVideoUrl}
        initialDescription={lessonDescription}
        isLoading={updatingLesson}
        isEditMode={true}
      />

      <LessonDeleteModal
        open={showDeleteLessonModal}
        onClose={() => setShowDeleteLessonModal(false)}
        onConfirm={async () => {
          if (!currentLessonId) return;
          setDeletingLesson(true);
          await deleteLesson(currentLessonId);
          setDeletingLesson(false);
          setShowDeleteLessonModal(false);
          setCurrentLessonId(null);
          getCourseById(courseId);
        }}
        lessonTitle={lessonTitle}
        isLoading={deletingLesson}
      />
    </div>
  );
}
