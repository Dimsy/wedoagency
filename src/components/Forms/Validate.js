
// export const required = value => value ? undefined : 'Заполните поле '
// export const email = value =>	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный email!' : undefined
// export const rusTextOnly = value =>	value && !/^[А-Яё ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined
// export const rusTextNumbers = value =>	value && !/^[А-Яё0-9.,+-=% ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined
// export const rusEnTextNumbers = value =>	value && !/^[A-Za-zА-Яё0-9.,+-=% ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined


//([0-9])

var numbersOnly = new RegExp('^[0-9]+$');

export const rusRequired = value => value ? undefined : 'Заполните поле '
export const rusPhone = value => value && !numbersOnly.test(value) ? 'Неправильный телефон!' : undefined
export const rusEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный email!' : undefined
export const rusTextOnly = value =>	value && !/^[А-Яё ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined
export const rusTextNumbers = value =>	value && !/^[А-Яё0-9.,+-=% ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined

export const enPhone = value => value && !numbersOnly.test(value) ? 'Wrong phone number!' : undefined;
export const enRequired = value => value ? undefined : 'Fill in '
export const enEmail = value =>	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Wrong an email!' : undefined
export const enTextOnly = value =>	value && !/^[A-Za-z ]{1,}$/i.test(value) ? 'Fill in on english!' : undefined
export const enTextNumbers = value =>	value && !/^[A-Za-z0-9.,+-=% ]{1,}$/i.test(value) ? 'Fill in on english!' : undefined
		

const ruMaxLength = max => value => value && value.length > max ? `Размер текста до ${max} символов` : undefined
const ruMinLength = min => value => value && value.length < min ? `Размер текста от ${min} символов` : undefined

const enMaxLength = max => value => value && value.length > max ? `Max ${max} letters` : undefined
const enMinLength = min => value => value && value.length < min ? `Min ${min} letters` : undefined

export const ruMaxLength300 = ruMaxLength(300)
export const ruMaxLength30 = ruMaxLength(30)
export const ruMinLength20 = ruMinLength(20)
export const ruMinLength3 = ruMinLength(3)

export const enMaxLength300 = enMaxLength(300)
export const enMaxLength30 = enMaxLength(30)
export const enMinLength20 = enMinLength(20)
export const enMinLength3 = enMinLength(3)
