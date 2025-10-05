import { FrameworkEnum } from "@/contexts/voice-context";
import { Component, Boxes, FileCode, FileType2, LucideIcon, Box, Link, Globe } from "lucide-react";
import { headerConfiguration } from "./courses/react/header-configuration";
import { dynamicComponents } from "./courses/react/dynamic-components";
import { useEffectLoopsState } from "./courses/react/use-effect-loops-state";
import { apiIntegrationBasics } from "./courses/react/api-integration-basics";
import { vueDirectives101 } from "./courses/vue/vue-directives-101";
import { reactiveStateVue } from "./courses/vue/reactive-state-vue";
import { typescriptBasics } from "./courses/static/typescript-basics";
import { advancedTypesGenerics } from "./courses/static/advanced-types-generics";
import { jsFundamentalsScopeClosures } from "./courses/static/js-fundamentals-scope-closures";
import { asyncJsFetch } from "./courses/static/async-js-fetch";
import { signalsReactivity } from "./courses/solid/signals-reactivity";
import { componentsControlFlow } from "./courses/solid/components-control-flow";
import { componentsTemplates } from "./courses/angular/components-templates";
import { servicesDependencyInjection } from "./courses/angular/services-dependency-injection";


export type Course = {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationMin: number;
  framework: FrameworkEnum;
  files: Record<string, string>;
  plan: string;
};

export const frameworks: Array<{ key: FrameworkEnum; name: string; icon: LucideIcon; color: string }> = [
  { key: FrameworkEnum.react, name: "React", icon: Component, color: "#61dafb" },
  { key: FrameworkEnum.vue, name: "Vue", icon: Boxes, color: "#42b883" },
  { key: FrameworkEnum.angular, name: "Angular", icon: FileType2, color: "#3178c6" },
  { key: FrameworkEnum.solid, name: "Solid", icon: Box, color: "#00bcd4" }, // dark cyan
  { key: FrameworkEnum.svelte, name: "Svelte", icon: Link, color: "#ff3e00" }, // orange red
  { key: FrameworkEnum.vanilla, name: "Vanilla", icon: FileCode, color: "#f7df1e" },
  { key: FrameworkEnum.static, name: "Static", icon: Globe, color: "#ff69b4" }, // pink
];

export const courses: Array<Course> = [
  headerConfiguration,
  dynamicComponents,
  useEffectLoopsState,
  apiIntegrationBasics,
  vueDirectives101,
  reactiveStateVue,
  signalsReactivity,
  componentsControlFlow,
  typescriptBasics,
  advancedTypesGenerics,
  jsFundamentalsScopeClosures,
  asyncJsFetch,
  componentsTemplates,
  servicesDependencyInjection,
];

export type EnrollmentStatus = "enrolled" | "finished";

// Mock of per-user enrollments keyed by course id
export const userEnrollments: Record<string, EnrollmentStatus> = {
  "r-1": "enrolled",
  "r-2": "finished",
  "v-1": "enrolled",
  "s-1": "enrolled",
  "s-2": "finished",
  "t-1": "enrolled",
  "t-2": "finished",
  "j-1": "enrolled",
  "j-2": "finished",
  "a-1": "enrolled",
  "a-2": "finished",
};


