export function required(value: string, name: string = 'فیلد') {
  if (value) {
    return true;
  }
  return `${name} نمیتواند خالی باشد`;
}
