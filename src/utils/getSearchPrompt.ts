import { RECIPE_GENERATION_REQUEST_STRING } from './constants';

export function getSearchPrompt(search: string, tags: string[]) {
  return `search for recipes with search: "${search}" and tags: ${JSON.stringify(tags)} ${RECIPE_GENERATION_REQUEST_STRING}`;
}