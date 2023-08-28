export function sheba(value: string) {
  if (!value) {
    return;
  }
  let sheba = /IR[0-9]{24}$/g.exec(value);
  if (sheba) {
    return true;
  }
  return 'شماره شبا را به همراه IR و بدون خط فاصله وارد نمایید';
}
