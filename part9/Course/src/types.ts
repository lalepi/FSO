export interface HeaderProps {
  name: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBasic extends CoursePartBase, CoursePartDesc {
  kind: "basic";
}

export interface CoursePartDesc extends CoursePartBase {
  description: string;
  kind: "basic" | "background" | "special";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBase, CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBase, CoursePartDesc {
  requirements: Array<string>;
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
