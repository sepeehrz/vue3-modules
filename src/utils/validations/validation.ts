import {required} from './validItems/required';
import {digit} from './validItems/digit';
import {mobile} from './validItems/mobile';
import {sheba} from './validItems/sheba';
import {postalCode} from './validItems/postalCode';
import {nationalCode} from './validItems/nationalCode';
import {phone} from './validItems/phone';
import {email} from './validItems/email';
import {nationalId} from './validItems/nationalId';
import {IValidation} from './types/types';

export const validations = () => {
  return {
    excuteValidations(type: Array<IValidation>, value: string, name?: string) {
      return new Promise(resolve => {
        if (!type) {
          return;
        }
        const result = type.map((e: IValidation) => {
          return this.validate(e, value, name);
        });
        resolve(result);
      });
    },
    validationItem(type: Array<IValidation>, value: string, name?: string) {
      return new Promise(resolve => {
        this.excuteValidations(type, value, name).then((data: any) => {
          const result = data.filter(
            (item: string | boolean) => typeof item === 'string'
          );
          resolve(result);
        });
      });
    },
    validate(name: any, value: string, label?: string) {
      var validMethods: Record<string, any> = {
        required,
        digit,
        mobile,
        sheba,
        postalCode,
        nationalCode,
        nationalId,
        phone,
        email
      };
      return validMethods[name](value, label);
    },
    validateAll(forms: any, value: any) {
      const fn = forms.map((items: any) => {
        return items.rows.map((row: any) => {
          return {
            model: row.model,
            validation: row.validation,
            label: row.label
          };
        });
      });
      return new Promise(async resolve => {
        const validationMessages: any = [];
        for (const item of fn) {
          for (const w of item) {
            if (w.validation) {
              const checkFormsItem = await this.validationItem(
                w.validation,
                value[w.model] === undefined ? '' : value[w.model],
                w.label
              );
              validationMessages.push(checkFormsItem);
            }
          }
        }
        const mergedArray = validationMessages.flat(1);
        resolve(mergedArray);
      });
    }
  };
};
