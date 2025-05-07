import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, ArrowLeft, CheckCircle2 } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  lessons: Lesson[];
  image: string;
  category: string;
  progress: number;
}

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
}

const mockCourse: Course = {
  id: "1",
  title: "Introdução à Sustentabilidade",
  description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia. Este curso abrange desde conceitos básicos até práticas avançadas de sustentabilidade.",
  duration: "4 semanas",
  students: 1234,
  image: "/course1.jpg",
  category: "Sustentabilidade",
  progress: 35,
  lessons: [
    {
      id: "1",
      title: "O que é Sustentabilidade?",
      description: "Conceitos fundamentais e importância da sustentabilidade",
      duration: "45 min",
      completed: true,
      videoUrl: "https://example.com/video1"
    },
    {
      id: "2",
      title: "Desenvolvimento Sustentável",
      description: "Entendendo os pilares do desenvolvimento sustentável",
      duration: "60 min",
      completed: true,
      videoUrl: "https://example.com/video2"
    },
    {
      id: "3",
      title: "Práticas Sustentáveis no Dia a Dia",
      description: "Como implementar práticas sustentáveis em sua rotina",
      duration: "50 min",
      completed: false,
      videoUrl: "https://example.com/video3"
    },
  ]
};

export default function CourseDetail({ courseId, onBack }: CourseDetailProps) {
  const navigate = useNavigate();
  const course = mockCourse;

  const handleLessonClick = (lessonId: string) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen mt-16">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Cursos
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons.length} aulas</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Conteúdo do Curso</h2>
                  <div className="space-y-4">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id)}
                        className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-gray-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            {lesson.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.duration}</span>
                              </div>
                              {lesson.completed && (
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
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-6 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Progresso do Curso</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Aulas Concluídas</span>
                        <span className="text-green-600 font-medium">
                          {course.lessons.filter(l => l.completed).length} de {course.lessons.length}
                        </span>
                      </div>
                      <Progress 
                        value={(course.lessons.filter(l => l.completed).length / course.lessons.length) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-2">Informações do Curso</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons.length} aulas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 