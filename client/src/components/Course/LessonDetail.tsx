import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface LessonDetailProps {
  courseId: string;
  lessonId: string;
  onBack: () => void;
}

const mockCourse: Course = {
  id: "1",
  title: "Introdução à Sustentabilidade",
  lessons: [
    {
      id: "1",
      title: "O que é Sustentabilidade?",
      description: "Conceitos fundamentais e importância da sustentabilidade",
      duration: "45 min",
      content: `
        <h2>Introdução</h2>
        <p>A sustentabilidade é um conceito fundamental que busca equilibrar o desenvolvimento econômico, social e ambiental. Nesta aula, vamos explorar os princípios básicos da sustentabilidade e sua importância no mundo atual.</p>
        
        <h2>Objetivos da Aula</h2>
        <ul>
          <li>Compreender o conceito de sustentabilidade</li>
          <li>Identificar os três pilares da sustentabilidade</li>
          <li>Reconhecer a importância das práticas sustentáveis</li>
        </ul>

        <h2>Conteúdo Principal</h2>
        <p>A sustentabilidade é baseada em três pilares principais:</p>
        <ol>
          <li><strong>Sustentabilidade Ambiental:</strong> Preservação dos recursos naturais e ecossistemas</li>
          <li><strong>Sustentabilidade Social:</strong> Equidade social e bem-estar das comunidades</li>
          <li><strong>Sustentabilidade Econômica:</strong> Desenvolvimento econômico responsável</li>
        </ol>
      `,
      videoUrl: "https://example.com/video1",
      completed: true,
    },
    {
      id: "2",
      title: "Desenvolvimento Sustentável",
      description: "Entendendo os pilares do desenvolvimento sustentável",
      duration: "60 min",
      content: "Conteúdo da aula 2...",
      videoUrl: "https://example.com/video2",
      completed: false,
    },
  ],
};

export default function LessonDetail({
  courseId,
  lessonId,
  onBack,
}: LessonDetailProps) {
  const navigate = useNavigate();
  const course = mockCourse;
  const lesson = course.lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="flex-1 flex flex-col min-h-screen mt-16">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Aula não encontrada
              </h2>
              <p className="text-gray-600 mb-6">
                A aula que você está procurando não existe.
              </p>
              <Button onClick={onBack}>Voltar para o Curso</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Curso
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{lesson.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm mb-8 mt-0">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Player de Vídeo</span>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Conteúdo da Aula</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div>
            <Card className="sticky top-6 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Aulas do Curso</h2>
                <div className="space-y-4">
                  {course.lessons.map((l, index) => (
                    <div
                      key={l.id}
                      onClick={() =>
                        navigate(`/courses/${courseId}/lessons/${l.id}`)
                      }
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        l.id === lessonId
                          ? "bg-green-50 border border-green-100"
                          : "hover:bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            l.id === lessonId
                              ? "bg-green-100"
                              : l.completed
                              ? "bg-green-50"
                              : "bg-gray-100"
                          }`}
                        >
                          {l.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {l.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{l.duration}</span>
                            </div>
                            {l.completed && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="w-3 h-3" />
                                Concluída
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium mb-4">Progresso do Curso</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Aulas Concluídas</span>
                        <span className="text-green-600 font-medium">
                          {course.lessons.filter((l) => l.completed).length}{" "}
                          de {course.lessons.length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (course.lessons.filter((l) => l.completed).length /
                            course.lessons.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
