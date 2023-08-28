export function nationalCode(value: string) {
  let isValid = false;
  if (!value) {
    return;
  }

  if (
    !/^\d{10}$/.test(value) ||
    value === '0000000000' ||
    value === '1111111111' ||
    value === '2222222222' ||
    value === '3333333333' ||
    value === '4444444444' ||
    value === '5555555555' ||
    value === '6666666666' ||
    value === '7777777777' ||
    value === '8888888888' ||
    value === '9999999999'
  ) {
    isValid = false;
  }
  var check = parseInt(value[9], 0);
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += parseInt(value[i], 0) * (10 - i);
  }
  sum %= 11;
  isValid = (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
  if (isValid) {
    return true;
  }
  return 'کد ملی اشتباه میباشد';
}
