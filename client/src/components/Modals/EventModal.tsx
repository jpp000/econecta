import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { X } from "lucide-react";

interface SingleEventModalProps {
  open: boolean;
  onOpenChange: (boolean: boolean) => void;
  event: {
    title: string;
    description?: string;
    tags?: { name: string; color: string }[];
    date?: Date;
  };
}

export const SingleEventModal = ({ open, onOpenChange, event }: SingleEventModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="[&>button.absolute.top-4.right-4]:hidden">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 rounded-full m-4 p-1 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4 text-[#1E3A3A]" />
          </button>
        </DialogHeader>

        {event.date && (
          <p className="text-sm text-muted-foreground mb-2">
            {format(event.date, "dd 'de' MMMM 'de' yyyy")}
          </p>
        )}

        {event.description && <p className="mb-2 text-sm">{event.description}</p>}

        {event.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags?.map((tag, i) => (
              <Badge key={i} className={`bg-${tag.color}`} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
