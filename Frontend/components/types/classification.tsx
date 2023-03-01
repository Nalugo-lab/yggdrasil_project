export interface Species {
  id: number;
  name: string;
  genus: Genus;
}

export interface Genus {
  id: number;
  name: string;
  family: Family;
}

export interface Family {
  id: number;
  name: string;
  group: Group;
}

export interface Group {
  id: number;
  name: string;
}
