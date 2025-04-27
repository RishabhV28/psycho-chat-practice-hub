
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ScenarioCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

const ScenarioCard = ({ id, title, description, category, difficulty, tags }: ScenarioCardProps) => {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/chat/${id}`} className="w-full">
          <Button className="w-full bg-psycho-500 hover:bg-psycho-600">
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Practice
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
