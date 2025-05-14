import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Edit, Trash2 } from "lucide-react";
import { useLessonsStore } from "@/store/useLessonsStore";
import LessonAddEditModal from '@/components/Modals/LessonAddEditModal';
import LessonDeleteModal from '@/components/Modals/LessonDeleteModal';
import YouTube from 'react-youtube';
import { getYouTubeVideoId } from "@/lib/utils";

interface LessonDetailProps {
  courseId: string;
  lessonId: string;
  onBack: () => void;
}

export default function LessonDetail({ lessonId, onBack }: LessonDetailProps) {
  const { lesson, getLessonById, updateLesson, deleteLesson, completeLesson, isLoading, error } = useLessonsStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    getLessonById(lessonId);
  
    const videoId = getYouTubeVideoId(lesson?.videoUrl || "");
  
    if (videoId) {
      setVideoId(videoId);
    }
    
  }, [lessonId, getLessonById]);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setVideoUrl(lesson.videoUrl);
      setDescription(lesson.description || "");
    }
  }, [lesson]);

  const handleVideoError = (event: any) => {
    console.error('YouTube Player Error:', event);
    setVideoError(true);
  };

  if (isLoading && !lesson) {
    return (
      <div className="flex-1 flex justify-center items-center min-h-screen mt-16">
        <p className="text-gray-500">Carregando aula...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen mt-16">
        <p className="text-red-500 mb-4">{error || "Aula não encontrada"}</p>
        <Button onClick={onBack}>Voltar para o Curso</Button>
      </div>
    );
  }

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
            Voltar para o Curso
          </Button>

          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
              {lesson.description && (
                <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>
              )}
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

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-900 rounded-lg mb-6 overflow-hidden">
                {lesson.videoUrl && !videoError ? (
                  <YouTube
                    videoId={videoId}
                    id={videoId}
                    className="w-full h-full"
                    title={lesson.title}
                    loading="eager"
                    opts={{
                      width: "100%",
                      height: "100%",
                    }}
                    onEnd={() => completeLesson(lessonId)}
                    onError={handleVideoError}
                  />
                ) : videoError ? (
                  <div className="flex items-center justify-center h-full text-red-500">
                    Erro ao carregar o vídeo. Por favor, tente novamente mais tarde.
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Nenhum vídeo disponível
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => completeLesson(lessonId)}
              >
                <CheckCircle className="w-4 h-4" />
                Marcar como Concluído
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="prose prose-green max-w-none">
                <h2>Conteúdo da Aula</h2>
                <p>
                  {lesson.description || "Esta aula não possui uma descrição detalhada."}
                </p>

                <h3>Materiais Complementares</h3>
                <p>
                  Links, referências e materiais adicionais podem ser listados aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LessonAddEditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={async (title, videoUrl, description) => {
          setUpdating(true);
          await updateLesson(lessonId, title, videoUrl, description);
          setUpdating(false);
          setShowEditModal(false);
        }}
        initialTitle={title}
        initialVideoUrl={videoUrl}
        initialDescription={description}
        isLoading={updating}
        isEditMode={true}
      />

      <LessonDeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          setDeleting(true);
          await deleteLesson(lessonId);
          setDeleting(false);
          setShowDeleteModal(false);
          onBack();
        }}
        lessonTitle={lesson.title}
        isLoading={deleting}
      />
    </div>
  );
}
