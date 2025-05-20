export function convertChoiceToJson<T>(content?: string): T | undefined {
  let obj: string = content?.replaceAll('```', '') || '';
  if (obj.length > 0) {
    obj = obj?.replaceAll('json', '');
  } else {
    return undefined;
  }

  try {
    return JSON.parse(obj) as T;
  } catch (error) {
    console.log(error);
  }
}
