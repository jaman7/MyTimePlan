export function arrayMove(arr, oldIndex, newIndex): any[] {
  const setIndex = ((newIndex % arr.length) + arr.length) % arr.length;
  arr.splice(setIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
