import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowLeft, Edit, Trash2, PlusCircle, Check } from "lucide-react";
import { useCoursesStore } from "@/store/useCoursesStore";
import { useLessonsStore } from "@/store/useLessonsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lesson } from "@/interfaces/course";

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

export default function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const navigate = useNavigate();
  const { course, getCourseById, isLoading: isLoadingCourse, error: courseError, updateCourse, deleteCourse } = useCoursesStore();
  const { lessons, getLessonsByCourse, createLesson, updateLesson, deleteLesson, isLoading: isLoadingLessons, error: lessonError } = useLessonsStore();
  
  // Estados para modais de curso
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  }, [courseId, getCourseById, getLessonsByCourse]);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description || "");
    }
  }, [course]);

  const handleLessonClick = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  // Funções para gerenciar o curso
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    await updateCourse(courseId, { title, description });
    setUpdating(false);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    await deleteCourse(courseId);
    setDeleting(false);
    setShowDeleteModal(false);
    onBack();
  };
  
  // Funções para gerenciar lições
  const handleAddLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingLesson(true);
    await createLesson(courseId, lessonTitle, lessonVideoUrl, lessonDescription);
    setAddingLesson(false);
    setShowAddLessonModal(false);
    setLessonTitle("");
    setLessonVideoUrl("");
    setLessonDescription("");
    // Recarregar o curso para ver as lições atualizadas
    getCourseById(courseId);
  };
  
  const openEditLessonModal = (lesson: Lesson) => {
    setCurrentLessonId(lesson._id);
    setLessonTitle(lesson.title);
    setLessonVideoUrl(lesson.videoUrl);
    setLessonDescription(lesson.description || "");
    setShowEditLessonModal(true);
  };
  
  const handleEditLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLessonId) return;
    
    setUpdatingLesson(true);
    await updateLesson(currentLessonId, lessonTitle, lessonVideoUrl, lessonDescription);
    setUpdatingLesson(false);
    setShowEditLessonModal(false);
    setCurrentLessonId(null);
    // Recarregar o curso para ver as lições atualizadas
    getCourseById(courseId);
  };
  
  const openDeleteLessonModal = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setShowDeleteLessonModal(true);
  };
  
  const handleDeleteLessonConfirm = async () => {
    if (!currentLessonId) return;
    
    setDeletingLesson(true);
    await deleteLesson(currentLessonId);
    setDeletingLesson(false);
    setShowDeleteLessonModal(false);
    setCurrentLessonId(null);
    // Recarregar o curso para ver as lições atualizadas
    getCourseById(courseId);
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
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const progressValue = lessons.length ? (completedLessons / lessons.length) * 100 : 0;

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{lessons.length} aulas</span>
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
                <CardContent className="p-6">
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
                  {lessons.length === 0 ? (
                    <p className="text-gray-500">Este curso ainda não possui aulas.</p>
                  ) : (
                    <div className="space-y-4">
                      {lessons.map((lesson, index) => (
                        <div
                          key={lesson._id}
                          className="p-4 rounded-lg transition-colors hover:bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500' : 'bg-white border border-gray-300'}`}>
                              {lesson.completed ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
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
                                onClick={() => openDeleteLessonModal(lesson._id)}
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
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Progresso do Curso</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Aulas Concluídas</span>
                        <span className="text-green-600 font-medium">
                          {completedLessons} de {lessons.length}
                        </span>
                      </div>
                      <Progress 
                        value={progressValue} 
                        className="h-2"
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Informações do Curso</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{lessons.length} aulas</span>
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

      {/* Modal de edição de curso */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do curso"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do curso"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={updating}>
                {updating ? "Salvando..." : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmação para exclusão de curso */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Curso</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>Tem certeza que deseja excluir o curso <strong>"{course.title}"</strong>? Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteConfirm} 
              disabled={deleting}
            >
              {deleting ? "Excluindo..." : "Excluir Curso"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de adição de lição */}
      <Dialog open={showAddLessonModal} onOpenChange={setShowAddLessonModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddLessonSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="lessonTitle" className="text-sm font-medium">Título da Aula</label>
              <Input
                id="lessonTitle"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Título da aula"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lessonVideoUrl" className="text-sm font-medium">URL do Vídeo</label>
              <Input
                id="lessonVideoUrl"
                value={lessonVideoUrl}
                onChange={(e) => setLessonVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lessonDescription" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="lessonDescription"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                placeholder="Descrição da aula"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowAddLessonModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={addingLesson}>
                {addingLesson ? "Adicionando..." : "Adicionar Aula"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Modal de edição de lição */}
      <Dialog open={showEditLessonModal} onOpenChange={setShowEditLessonModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditLessonSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="editLessonTitle" className="text-sm font-medium">Título da Aula</label>
              <Input
                id="editLessonTitle"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Título da aula"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editLessonVideoUrl" className="text-sm font-medium">URL do Vídeo</label>
              <Input
                id="editLessonVideoUrl"
                value={lessonVideoUrl}
                onChange={(e) => setLessonVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="editLessonDescription" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="editLessonDescription"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                placeholder="Descrição da aula"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEditLessonModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={updatingLesson}>
                {updatingLesson ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Modal de confirmação para exclusão de lição */}
      <Dialog open={showDeleteLessonModal} onOpenChange={setShowDeleteLessonModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Aula</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>Tem certeza que deseja excluir esta aula? Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteLessonModal(false)}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteLessonConfirm} 
              disabled={deletingLesson}
            >
              {deletingLesson ? "Excluindo..." : "Excluir Aula"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 