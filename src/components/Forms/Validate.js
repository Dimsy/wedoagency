
export const required = value => value ? undefined : 'Заполните поле '
export const email = value =>	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неправильный email!' : undefined
export const rusTextOnly = value =>	value && !/^[А-Яё ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined
export const rusTextNumbers = value =>	value && !/^[А-Яё0-9.,+-=% ]{1,}$/i.test(value) ? 'Заполните поле на русском языке!' : undefined

const maxLength = max => value => value && value.length > max ? `Размер текста до ${max} символов` : undefined
const minLength = min => value => value && value.length < min ? `Размер текста от ${min} символов` : undefined

export const maxLength300 = maxLength(300)
export const maxLength30 = maxLength(30)
export const minLength20 = minLength(20)
export const minLength3 = minLength(3)
