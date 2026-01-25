import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CourseEditModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialTitle: string;
  initialDescription: string;
  isLoading: boolean;
}

export default function CourseEditModal({
  open,
  onClose,
  onSubmit,
  initialTitle,
  initialDescription,
  isLoading,
}: CourseEditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-950">Editar Curso</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-green-950"
            >
              Título
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do curso"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-green-950"
            >
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do curso"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#2F4F4F] hover:bg-[#2F4F4F]/90 cursor-pointer"
            >
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
