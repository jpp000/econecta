import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { getYouTubeVideoId } from '@/lib/utils';

interface LessonAddEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, videoUrl: string, description: string) => void;
  initialTitle?: string;
  initialVideoUrl?: string;
  initialDescription?: string;
  isLoading: boolean;
  isEditMode: boolean;
}

const lessonsFormSchema = z.object({
  title: z.string().min(1),
  videoUrl: z.string().url().refine((url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId !== null;
  }, {
    message: 'URL do vídeo inválida',
  }),
  description: z.string().optional(),
});

export default function LessonAddEditModal({ open, onClose, onSubmit, initialTitle = '', initialVideoUrl = '', initialDescription = '', isLoading, isEditMode }: LessonAddEditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setVideoUrl(initialVideoUrl);
      setDescription(initialDescription);
    }
  }, [open, initialTitle, initialVideoUrl, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { title, videoUrl, description };
    const result = lessonsFormSchema.safeParse(formData);
    if (!result.success) {
      alert(result.error.errors.map(err => err.message).join('\n'));
      return;
    }
    onSubmit(title, videoUrl, description);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Editar Aula' : 'Adicionar Nova Aula'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="lessonTitle" className="text-sm font-medium">Título da Aula</label>
            <Input
              id="lessonTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da aula"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lessonVideoUrl" className="text-sm font-medium">URL do Vídeo</label>
            <Input
              id="lessonVideoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Link do vídeo do YouTube"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lessonDescription" className="text-sm font-medium">Descrição</label>
            <Textarea
              id="lessonDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da aula"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEditMode ? 'Salvando...' : 'Adicionando...') : (isEditMode ? 'Salvar Alterações' : 'Adicionar Aula')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 