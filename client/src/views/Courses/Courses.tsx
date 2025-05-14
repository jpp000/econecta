import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@/interfaces/course";

interface CoursesProps {
  onCourseSelect: (courseId: string) => void;
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  getCourses: () => Promise<void>;
  createCourse: ({ title, description }: Omit<Course, "_id" | "lessons">) => Promise<void>;
  clearError: () => void;
}

export default function Courses({ 
  onCourseSelect, 
  courses, 
  isLoading, 
  error, 
  getCourses, 
  createCourse,
  clearError
}: CoursesProps) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await createCourse({ title, description });
    setCreating(false);
    setShowModal(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen border-2 border-slate-50 mt-16">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-green-900 mb-2">Meus Cursos</h1>
              <p className="text-lg text-green-800">
                Continue de onde parou ou comece um novo curso
              </p>
            </div>
            <Button
              className="bg-[#ece94c] text-black font-semibold rounded-full px-6 py-2 shadow hover:bg-[#ece94c]/90 transition-all"
              onClick={() => setShowModal(true)}
            >
              + Novo Curso
            </Button>
          </div>

          {error && (
            <div className="text-red-600 mb-4 flex justify-between items-center">
              <span>{error}</span>
              <Button variant="ghost" size="sm" onClick={clearError}>Fechar</Button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-500">Carregando cursos...</div>
          ) : courses.length === 0 ? (
            <div className="text-center text-gray-500">Nenhum curso encontrado.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card 
                  key={course._id}
                  className="cursor-pointer transition-all hover:shadow-lg bg-white"
                  onClick={() => onCourseSelect(course._id)}
                >
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {course.description || "Curso"}
                    </div>
                    <h2 className="text-xl font-bold text-green-900 mb-2">{course.title}</h2>
                    <p className="text-green-800 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-green-900 mb-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons.length} aulas</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-[#ece94c] text-black font-semibold rounded-full hover:bg-[#ece94c]/90 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCourseSelect(course._id);
                      }}
                    >
                      Acessar Curso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de criação de curso */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Novo Curso</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                placeholder="Título do curso"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Descrição (opcional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
              <Button
                type="submit"
                className="bg-[#ece94c] text-black font-semibold rounded-full hover:bg-[#ece94c]/90 mt-2"
                disabled={creating}
              >
                {creating ? "Criando..." : "Criar Curso"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
