import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Edit, Trash2 } from "lucide-react";
import { useLessonsStore } from "@/store/useLessonsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LessonDetailProps {
  courseId: string;
  lessonId: string;
  onBack: () => void;
}

export default function LessonDetail({ courseId, lessonId, onBack }: LessonDetailProps) {
  const { lesson, getLessonById, updateLesson, deleteLesson, completeLesson, isLoading, error } = useLessonsStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getLessonById(lessonId);
  }, [lessonId, getLessonById]);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setVideoUrl(lesson.videoUrl);
      setDescription(lesson.description || "");
    }
  }, [lesson]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    await updateLesson(lessonId, title, videoUrl, description);
    setUpdating(false);
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    await deleteLesson(lessonId);
    setDeleting(false);
    setShowDeleteModal(false);
    onBack();
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
                {lesson.videoUrl ? (
                  <iframe
                    className="w-full h-full"
                    src={lesson.videoUrl}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
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

      {/* Modal de edição */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Aula</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da aula"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="videoUrl" className="text-sm font-medium">URL do Vídeo</label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da aula"
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

      {/* Modal de confirmação para exclusão */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir Aula</DialogTitle>
          </DialogHeader>
          <div className="py-3">
            <p>Tem certeza que deseja excluir a aula <strong>"{lesson.title}"</strong>? Esta ação não pode ser desfeita.</p>
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
              {deleting ? "Excluindo..." : "Excluir Aula"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
