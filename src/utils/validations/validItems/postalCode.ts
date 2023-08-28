export function postalCode(value: string) {
  if (!value) {
    return true;
  }
  let postalCode = /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/g.exec(value);
  if (postalCode) {
    return true;
  }
  return 'کد پستی اشتباه میباشد';
}
