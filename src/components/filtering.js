import {createComparison, defaultRules} from "../lib/compare.js";

//  настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // заполнить выпадающие списки опциями
    Object.keys(indexes)
    .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
        );
    });

    return (data, state, action) => {
        // обработать очистку поля
        if (action && action.name === 'clear') {
    const field = action.dataset.field;

    const parent = action.parentElement;
    const input = parent.querySelector('[name]');

    if (input) {
        input.value = '';
    }

    state[field] = '';
}

        // отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));

    }
}