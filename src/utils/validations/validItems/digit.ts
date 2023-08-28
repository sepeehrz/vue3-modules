export function digit(value: string, name: string = 'این فیلد') {
  let isValid = false;
  if (!value) {
    return true;
  }

  const strVal = String(value);

  isValid = /^\d*$/u.test(strVal);

  if (isValid) {
    return true;
  }
  return `${name} باید عدد استفاده شود`;
}
