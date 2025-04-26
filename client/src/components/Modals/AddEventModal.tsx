import { useEffect, useState } from "react";
import { Leaf, X, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: any;
  selectedDate?: Date | null;
  isDateEditable?: boolean;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onOpenChange,
  onAddEvent,
  selectedDate = null,
  isDateEditable = true,
}) => {
  console.log("Selected Date:", selectedDate);
  console.log("Is Date Editable:", isDateEditable);
  console.log("Open State:", open);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(selectedDate || new Date());

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = async () => {
    const newEvent = {
      title,
      description,
      date,
    };

    onAddEvent(newEvent);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white border-[#1E3A3A]/20 rounded-xl [&>button.absolute.top-4.right-4]:hidden">
        <DialogHeader className="relative">
          <DialogTitle className="text-[#1E3A3A] text-xl font-semibold">
            New Sustainable Event
          </DialogTitle>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 rounded-full p-1 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4 text-[#1E3A3A]" />
          </button>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-[#1E3A3A] font-medium">Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-slate-300 hover:bg-slate-100 cursor-pointer",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#1E3A3A]" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selected) => {
                    if (selected) setDate(selected);
                  }}
                  initialFocus
                  disabled={!isDateEditable}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#1E3A3A] font-medium">
              Event Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="border-slate-300 focus-visible:ring-[#1E3A3A] cursor-text"
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#1E3A3A] font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your sustainable event"
              className="min-h-[100px] border-slate-300 focus-visible:ring-[#1E3A3A] cursor-text"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between mt-4">
          <div className="hidden sm:flex items-center text-xs text-[#1E3A3A]/80 gap-1">
            <Leaf className="h-3.5 w-3.5" />
            <span>Supporting sustainable planning</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-300 text-[#1E3A3A] hover:bg-slate-100 hover:text-[#1E3A3A] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#1E3A3A] to-green-800 hover:bg-gradient-to-bl text-white cursor-pointer"
              disabled={!title.trim()}
            >
              Add Event
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
