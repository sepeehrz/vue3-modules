export function email(value: string) {
  if (!value) {
    return true;
  }
  let email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.exec(
      value
    );

  if (email) {
    return true;
  }
  return 'فرمت ایمیل اشتباه میباشد';
}
