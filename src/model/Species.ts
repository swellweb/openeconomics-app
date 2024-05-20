// models/Species.ts
export default class Species {
    name: string;
    category: string;
    classes: string;
    measures: string;

  
    constructor(name: string, category: string,classes: string, measures: string) {
      this.name = name;
      this.category = category;
      this.classes = classes;
      this.measures = measures;
    }
  }