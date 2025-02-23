const required = (value: string): string => {
    return !value.length ? "Обязательно поле." : "";
};

const requiredMinimumUpperCaseAndNumbers = (value): string => {
    return !value.match(/(?=.*[A-Z])(?=.*[0-9])/)
        ? "Пароль должен содержать минимум одну заглавную букву и одну цифру."
        : "";
};
const minLength = (
    length: number = 2
): ReturnType<() => (value: string) => string> => {
    return (value: string): string => {
        return value.length < length
            ? `Минимальное количество символов ${length}.`
            : "";
    };
};

const maxLength = (
    length: number = 8
): ReturnType<() => (value: string) => string> => {
    return (value: string): string => {
        return value.length > length
            ? `Максимальное количество символов ${length}.`
            : "";
    };
};

const firstLetterUppercase = (value: string): string => {
    if (!value.length) return "";
    return !value[0].match(/[А-ЯA-Z]/)
        ? "Первая буква должна быть заглавной."
        : "";
};

const acceptedSigns = (
    ...args: string[]
): ReturnType<() => (signs: string) => string> => {
    return (value) => {
        const regex = new RegExp(`[^${args.join("")}\sa-zA-Zа-яА-Я0-9]`);
        return regex.test(value)
            ? "Допустимые символы: " + args.join(", ")
            : "";
    };
};

const isEmail = (value: string): string => {
    return !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ? "Некорректный email."
        : "";
};

const excludeNumbers = (value: string): string => {
    return !value.match(/^[^0-9]*$/) ? "Нельзя вводить цифры." : "";
};

const onlyNumbers = (value: string): string => {
    return !value.match(/^[0-9]*$/) ? "Можно вводить только цифры." : "";
};

const hasAlphanumericContent = (value: string): string => {
    return !value.match(/[а-яА-Яa-zA-Z]/)
        ? "Поле может содержать буквы с цифрами, но не польностью состоять только из цифр."
        : "";
};

const isLatin = (value: string): string => {
    return !value.match(/^[a-zA-Z0-9]+$/)
        ? "Поле должно содержать только латиницу."
        : "";
};

export {
    required,
    minLength,
    maxLength,
    firstLetterUppercase,
    acceptedSigns,
    excludeNumbers,
    isEmail,
    hasAlphanumericContent,
    isLatin,
    onlyNumbers,
    requiredMinimumUpperCaseAndNumbers,
};
