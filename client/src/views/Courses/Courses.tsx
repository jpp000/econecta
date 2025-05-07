import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: number;
  lessons: number;
  image: string;
  category: string;
  progress: number;
}

interface CoursesProps {
  onCourseSelect: (courseId: string) => void;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introdução à Sustentabilidade",
    description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia.",
    duration: "4 semanas",
    students: 1234,
    lessons: 12,
    image: "/course1.jpg",
    category: "Sustentabilidade",
    progress: 50
  },
  {
    id: "2",
    title: "Energia Renovável",
    description: "Explore as diferentes fontes de energia renovável e suas aplicações.",
    duration: "6 semanas",
    students: 856,
    lessons: 18,
    image: "/course2.jpg",
    category: "Energia",
    progress: 20
  },
  {
    id: "3",
    title: "Introdução à Sustentabilidade",
    description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia.",
    duration: "4 semanas",
    students: 1234,
    lessons: 12,
    image: "/course3.jpg",
    category: "Sustentabilidade",
    progress: 50
  },
  {
    id: "4",
    title: "Introdução à Sustentabilidade",
    description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia.",
    duration: "4 semanas",
    students: 1234,
    lessons: 12,
    image: "/course4.jpg",
    category: "Sustentabilidade",
    progress: 50
  },
  {
    id: "5",
    title: "Introdução à Sustentabilidade",
    description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia.",
    duration: "4 semanas",
    students: 1234,
    lessons: 12,
    image: "/course5.jpg",
    category: "Sustentabilidade",
    progress: 50
  },
  {
    id: "6",
    title: "Introdução à Sustentabilidade",
    description: "Aprenda os fundamentos da sustentabilidade e como aplicá-los no dia a dia.",
    duration: "4 semanas",
    students: 1234,
    lessons: 12,
    image: "/course6.jpg",
    category: "Sustentabilidade",
    progress: 50
  },
];

export default function Courses({ onCourseSelect }: CoursesProps) {
  return (
    <div className="flex-1 flex flex-col min-h-screen mt-16">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Meus Cursos</h1>
            <p className="text-lg text-gray-600">
              Continue de onde parou ou comece um novo curso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <Card 
                key={course.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => onCourseSelect(course.id)}
              >
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} alunos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} aulas</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Progresso</span>
                      <span className="text-green-600 font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <Button 
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCourseSelect(course.id);
                    }}
                  >
                    {course.progress > 0 ? "Continuar Curso" : "Começar Curso"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
