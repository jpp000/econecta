import { format } from "date-fns"
import { CalendarIcon, Leaf } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ptBR } from "date-fns/locale"

interface DayEventsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate: Date
  events: {
    title: string
    date: Date
    description?: string
    tags?: { name: string; color: string }[]
  }[]
  onAddEvent?: () => void
}

export function DayEventsModal({ open, onOpenChange, selectedDate, events }: DayEventsModalProps) {
  // Filter events for the selected date
  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  // Format the date in Portuguese
  const formattedDate = format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] bg-white border-[#1E3A3A]/20 rounded-xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1E3A3A] to-green-800 text-white p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="h-5 w-5" />
              <DialogTitle className="text-xl font-medium capitalize">{formattedDate}</DialogTitle>
            </div>
            <p className="text-white/80 text-sm font-light">
              {dayEvents.length === 0
                ? "Nenhum evento programado para este dia"
                : dayEvents.length === 1
                  ? "1 evento programado"
                  : `${dayEvents.length} eventos programados`}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-6">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-[#1E3A3A]/10 hover:border-[#1E3A3A]/20 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-[#1E3A3A] mb-2">{event.title}</h3>

                    {event.description && <p className="text-sm text-[#1E3A3A]/80 mb-3">{event.description}</p>}

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
        </div>

        {dayEvents.length > 0 && (
          <div className="p-4 border-t border-[#1E3A3A]/10 flex justify-between items-center">
            <div className="flex items-center text-xs text-[#1E3A3A]/70 gap-1">
              <Leaf className="h-3.5 w-3.5" />
              <span>Planejamento sustentável</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
