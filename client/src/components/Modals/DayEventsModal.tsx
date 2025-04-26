import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Leaf, Pencil, Sparkles, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Event } from "@/interfaces/event.interface";

interface DayEventsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date | null;
  events: Event[];
}

export function DayEventsModal({
  open,
  onOpenChange,
  selectedDate,
  events,
}: DayEventsModalProps) {
  const formattedDate = selectedDate
    ? format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    : "";

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    title: string;
    description?: string;
  }>({ title: "", description: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleSaveEdit(id: string) {
    console.log("Salvar evento:", id, editData);
    // TODO: chamar função externa ou atualizar evento no estado global
    setEditingId(null);
  }

  function handleDeleteEvent(id: string) {
    console.log("Excluir evento com id:", id);
    return;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden border-none shadow-xl rounded-xl">
        <div className="bg-gradient-to-r from-[#1E3A3A] to-green-800 text-white p-8">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="h-5 w-5 text-green-200" />
              <DialogTitle className="text-2xl font-medium capitalize">
                {formattedDate}
              </DialogTitle>
            </div>
            <p className="text-green-100 text-sm font-light flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {(events || []).length === 0
                ? "Nenhum evento programado para este dia"
                : (events || []).length === 1
                ? "1 evento programado"
                : `${(events || []).length} eventos programados`}
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          {(events || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-green-800" />
              </div>
              <h3 className="text-lg font-medium text-green-900 mb-2">
                Dia livre de eventos
              </h3>
              <p className="text-sm text-green-800 max-w-xs mb-6">
                Aproveite este dia para atividades sustentáveis ou adicione um
                novo evento.
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full max-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-green-900">
                  Eventos do dia
                </h3>
              </div>
              <ScrollArea className="max-h-[400px] pr-4 pb-6">
                <div className="space-y-4">
                  {events?.map((event) => (
                    <div
                      key={event._id}
                      className="flex justify-between p-5 rounded-xl border transition-all duration-300 bg-gradient-to-br from-white to-green-50/50"
                    >
                      {editingId === event._id ? (
                        <div className="flex flex-col w-full">
                          <input
                            className="mb-2 border rounded px-3 py-2 text-sm text-green-900"
                            value={editData.title}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                title: e.target.value,
                              })
                            }
                          />
                          <textarea
                            className="mb-2 border rounded px-3 py-2 text-sm text-green-900"
                            value={editData.description}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                description: e.target.value,
                              })
                            }
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="cursor-pointer"
                              onClick={() => setEditingId(null)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-[#1E3A3A] to-green-800 text-white cursor-pointer"
                              onClick={() => handleSaveEdit(event._id)}
                            >
                              Salvar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-medium text-green-900">
                                {event.title}
                              </h3>
                            </div>
                            {event.description && (
                              <p className="text-sm text-green-800/80 mb-3">
                                {event.description}
                              </p>
                            )}
                          </div>
                          <div className="flex justify-between w-12 shrink-0">
                            <Pencil
                              className="size-5 text-green-900 cursor-pointer"
                              onClick={() => {
                                setEditingId(event._id);
                                setEditData({
                                  title: event.title,
                                  description: event.description,
                                });
                              }}
                            />
                            <Trash
                              className="size-5 text-green-900 cursor-pointer"
                              onClick={() => setDeleteId(event._id)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-between items-center bg-white">
          <div className="flex items-center text-xs text-green-800 gap-1.5">
            <Leaf className="h-3.5 w-3.5" />
            <span>Planejamento sustentável</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-green-800 hover:text-green-900 cursor-pointer"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja excluir este evento?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteId(null)}
              className="cursor-pointer"
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={() => {
                if (deleteId) {
                  handleDeleteEvent(deleteId);
                  setDeleteId(null);
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
