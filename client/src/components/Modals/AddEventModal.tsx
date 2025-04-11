import { useEffect, useState } from "react";
import { Leaf, X, CalendarIcon, Check } from "lucide-react";
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

const sustainableTags = [
  { name: "Eco-Friendly", color: "#2E7D32" },
  { name: "Renewable", color: "#00796B" },
  { name: "Conservation", color: "#558B2F" },
  { name: "Community", color: "#827717" },
  { name: "Recycling", color: "#1B5E20" },
];

export function SustainableEventModal({
  open,
  onOpenChange,
  onAddEvent,
  selectedDate,
  isDateEditable,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [date, setDate] = useState(selectedDate || new Date());

  // Update date when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = () => {
    const newEvent = {
      title,
      description,
      tags: selectedTags,
      date: date,
    };

    onAddEvent(newEvent);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedTags([]);
    // Don't reset date to keep the context
  };

  const toggleTag = (tag) => {
    if (selectedTags.some((t) => t.name === tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const isTagSelected = (tagName) => {
    return selectedTags.some((tag) => tag.name === tagName);
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
                  onSelect={setDate}
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

          {/* Tags Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-[#1E3A3A] font-medium ml-1">
                Event Tags (Optional)
              </Label>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-[#1E3A3A]/70 hover:text-[#1E3A3A] cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Available Tags */}
            <div className="flex flex-wrap gap-3">
              {sustainableTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => toggleTag(tag)}
                  className={`h-3/4 p-2 rounded-full text-white text-sm transition-all flex items-center cursor-pointer ${
                    isTagSelected(tag.name)
                      ? "ring-2 ring-offset-2 ring-offset-white ring-[#1E3A3A]"
                      : "hover:opacity-90"
                  }`}
                  style={{ backgroundColor: tag.color }}
                >
                  {isTagSelected(tag.name) && <Check className="h-3 w-3" />}
                  {tag.name}
                </button>
              ))}
            </div>

            {/* Selected Tags Summary */}
            {selectedTags.length > 0 && (
              <div className="bg-[#1E3A3A]/5 p-2 rounded-lg mt-6">
                <p className="text-sm text-[#1E3A3A]/70 mb-1.5 ml-1">
                  Tags:
                </p>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag.name}
                      className="text-xs p-1.5 rounded-full text-white"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
}
