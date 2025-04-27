
import { useState } from "react";
import ScenarioCard from "@/components/ScenarioCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample scenario data
const scenarios = [
  {
    id: "anxiety-disorder",
    title: "Generalized Anxiety Disorder",
    description: "Practice with a patient experiencing symptoms of GAD including excessive worry, restlessness, and physical symptoms.",
    category: "Anxiety Disorders",
    difficulty: "Beginner" as const,
    tags: ["Anxiety", "CBT", "Assessment"],
    patientName: "Alex",
  },
  {
    id: "depression",
    title: "Major Depressive Disorder",
    description: "Interact with a patient showing signs of depression including persistent sadness, loss of interest, and fatigue.",
    category: "Mood Disorders",
    difficulty: "Intermediate" as const,
    tags: ["Depression", "Mood", "Therapy"],
    patientName: "Jordan",
  },
  {
    id: "grief-counseling",
    title: "Grief Counseling",
    description: "Help a patient navigate the complex emotions following the loss of a loved one.",
    category: "Crisis Intervention",
    difficulty: "Intermediate" as const,
    tags: ["Grief", "Loss", "Counseling"],
    patientName: "Morgan",
  },
  {
    id: "relationship-conflict",
    title: "Relationship Conflict",
    description: "Assist a client seeking help for ongoing relationship conflicts and communication problems.",
    category: "Couples Therapy",
    difficulty: "Advanced" as const,
    tags: ["Relationships", "Communication", "Conflict"],
    patientName: "Taylor",
  },
  {
    id: "substance-use",
    title: "Alcohol Use Disorder",
    description: "Practice motivational interviewing with a patient showing signs of problematic alcohol use.",
    category: "Substance Use Disorders",
    difficulty: "Advanced" as const,
    tags: ["Addiction", "Motivational Interviewing", "Assessment"],
    patientName: "Casey",
  },
];

const Scenarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories for filter
  const categories = ["all", ...new Set(scenarios.map((s) => s.category))];

  // Filter scenarios based on search and filters
  const filteredScenarios = scenarios.filter((scenario) => {
    const matchesSearch =
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDifficulty =
      difficultyFilter === "all" || scenario.difficulty === difficultyFilter;

    const matchesCategory =
      categoryFilter === "all" || scenario.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Practice Scenarios</h1>
        <p className="text-gray-600">
          Select a scenario to practice your therapeutic conversation skills with a simulated patient.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search scenarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              id={scenario.id}
              title={scenario.title}
              description={scenario.description}
              category={scenario.category}
              difficulty={scenario.difficulty}
              tags={scenario.tags}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">
              No scenarios match your search criteria. Please try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scenarios;
