import { RECIPE_GENERATION_REQUEST_STRING } from './constants';

export function getSearchPrompt(prompt: string) {
  return `"${prompt}" ${RECIPE_GENERATION_REQUEST_STRING}`;
}
