
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample scenario data (would typically come from a database)
const scenarioData = {
  "anxiety-disorder": {
    title: "Generalized Anxiety Disorder",
    patientName: "Alex",
  },
  "depression": {
    title: "Major Depressive Disorder",
    patientName: "Jordan",
  },
  "grief-counseling": {
    title: "Grief Counseling",
    patientName: "Morgan",
  },
  "relationship-conflict": {
    title: "Relationship Conflict",
    patientName: "Taylor",
  },
  "substance-use": {
    title: "Alcohol Use Disorder",
    patientName: "Casey",
  },
};

const Chat = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<{
    title: string;
    patientName: string;
  } | null>(null);

  useEffect(() => {
    if (!scenarioId || !scenarioData[scenarioId as keyof typeof scenarioData]) {
      navigate("/scenarios");
      return;
    }

    setScenario(scenarioData[scenarioId as keyof typeof scenarioData]);
  }, [scenarioId, navigate]);

  if (!scenario) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-psycho-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 sm:px-4 py-4 max-w-6xl">
      <div className="mb-4 px-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/scenarios")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">{scenario.title}</h1>
            <p className="text-sm text-muted-foreground">
              Chat with patient: {scenario.patientName}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <ChatInterface
          scenarioId={scenarioId || ""}
          patientName={scenario.patientName}
        />
      </div>
    </div>
  );
};

export default Chat;
