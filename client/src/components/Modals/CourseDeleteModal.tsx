import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CourseDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseTitle: string;
  isLoading: boolean;
}

export default function CourseDeleteModal({
  open,
  onClose,
  onConfirm,
  courseTitle,
  isLoading,
}: CourseDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Excluir Curso</DialogTitle>
        </DialogHeader>
        <div className="py-3">
          <p>
            Tem certeza que deseja excluir o curso{" "}
            <strong>"{courseTitle}"</strong>? Esta ação não pode ser desfeita.
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
            {isLoading ? "Excluindo..." : "Excluir Curso"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
