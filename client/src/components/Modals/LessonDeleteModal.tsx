import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LessonDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lessonTitle: string;
  isLoading: boolean;
}

export default function LessonDeleteModal({
  open,
  onClose,
  onConfirm,
  lessonTitle,
  isLoading,
}: LessonDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Excluir Aula</DialogTitle>
        </DialogHeader>
        <div className="py-3">
          <p>
            Tem certeza que deseja excluir a aula{" "}
            <strong>"{lessonTitle}"</strong>? Esta ação não pode ser desfeita.
          </p>
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
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? "Excluindo..." : "Excluir Aula"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
