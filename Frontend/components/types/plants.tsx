import { Species } from "./classification";
import { Owner } from "./owner";

export interface Soil {
  name: string;
  description: string;
}

export interface Sun_regime {
  name: string;
  description: string;
}

export interface Plant {
  id: number;

  owner: Owner;
  soil: Soil;
  sun_regime: Sun_regime;

  species: Species;

  banner: Image;
  popular_name: string | null;
  custom_name: string | null;
  complementary_name: string | null;
  last_watered: string | null;
  last_fertilized: string | null;
  is_dead: boolean;
  is_archived: boolean;
  images: Array<Image>
}

export interface Image {
  image: string;
  // Qualquer coisa eu coloco o plant como keyof plant
  plant: number;
  is_banner: boolean;
}
