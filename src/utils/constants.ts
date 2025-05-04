export const RECIPE_GENERATION_REQUEST_STRING = `
please generate a recipe for me that adheres to the previous description and has responds to this interface and as a json string no additional content is allowed:
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Instruction {
  description: string;
}

export interface Tag {
  name: string;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  imgUrl: string;
  tags: Tag[];
}
`;
