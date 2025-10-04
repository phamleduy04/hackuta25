export type FrameworkKey = "react" | "vue" | "python" | "javascript";

export type Course = {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationMin: number;
  framework: FrameworkKey;
};

export const frameworks: Array<{ key: FrameworkKey; name: string }> = [
  { key: "react", name: "React" },
  { key: "vue", name: "Vue" },
  { key: "python", name: "Python" },
  { key: "javascript", name: "JavaScript" },
];

export const courses: Array<Course> = [
  { id: "r-1", title: "Header Configuration", difficulty: "Beginner", durationMin: 25, framework: "react" },
  { id: "r-2", title: "Dynamic Components", difficulty: "Beginner", durationMin: 30, framework: "react" },
  { id: "r-3", title: "useEffect Loops & State", difficulty: "Intermediate", durationMin: 35, framework: "react" },
  { id: "r-4", title: "API Integration Basics", difficulty: "Intermediate", durationMin: 40, framework: "react" },

  { id: "v-1", title: "Vue Directives 101", difficulty: "Beginner", durationMin: 25, framework: "vue" },
  { id: "v-2", title: "Reactive State in Vue", difficulty: "Beginner", durationMin: 28, framework: "vue" },

  { id: "p-1", title: "Python Basics: Variables & Loops", difficulty: "Beginner", durationMin: 30, framework: "python" },
  { id: "p-2", title: "Working with Files", difficulty: "Intermediate", durationMin: 35, framework: "python" },

  { id: "j-1", title: "JS Fundamentals: Scope & Closures", difficulty: "Intermediate", durationMin: 40, framework: "javascript" },
  { id: "j-2", title: "Async JS with Fetch", difficulty: "Intermediate", durationMin: 38, framework: "javascript" },
];

export type EnrollmentStatus = "enrolled" | "finished";

// Mock of per-user enrollments keyed by course id
export const userEnrollments: Record<string, EnrollmentStatus> = {
  "r-1": "enrolled",
  "r-2": "finished",
  "v-1": "enrolled",
};


