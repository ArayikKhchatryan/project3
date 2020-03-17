export class ProjectViewModel {
  id: number;
  projectTitle: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.projectTitle = name;
  }
}
