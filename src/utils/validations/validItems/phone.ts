export function phone(value: string) {
  if (!value) {
    return true;
  }
  let phone = /^[0-9]{11,11}$/g.exec(value);
  if (phone) {
    return true;
  }
  return 'فرمت شماره تلفن اشتباه میباشد';
}
