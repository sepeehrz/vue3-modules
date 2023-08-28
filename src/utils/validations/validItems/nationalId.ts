export function nationalId(value: string) {
  if (!value) {
    return true;
  }
  var L = value.length;

  if (L < 11 || parseInt(value, 10) == 0) return 'شناسه ملی اشتباه میباشد';
  if (parseInt(value.substr(3, 6), 10) == 0) return 'شناسه ملی اشتباه میباشد';
  var c = parseInt(value.substr(10, 1), 10);
  var d = parseInt(value.substr(9, 1), 10) + 2;
  var z = new Array(29, 27, 23, 19, 17);
  var s = 0;
  for (var i = 0; i < 10; i++)
    s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5];
  s = s % 11;
  if (s == 10) s = 0;
  if (c == s) {
    return true;
  }
  return 'شناسه ملی اشتباه میباشد';
}
