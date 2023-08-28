export function mobile(value: string) {
  if (!value) {
    return;
  }
  const mobile = /^09[0-39|]\d{8}$/u.exec(value);

  if (mobile) {
    return true;
  }
  return 'فرمت موبایل اشتباه میباشد';
}
