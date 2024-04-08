export const span = function(attributes, parent) {
    return element('span', attributes, parent);
}

export const img = function(attributes, parent) {
    return element('img', attributes, parent);
}

export const div = function(attributes, parent) {
    return element('div', attributes, parent);
}

export const element = function(tag, attributes, parent) {
    let el = document.createElement(tag)
    parent.appendChild(el);
    for (const key in attributes) {
        el[key] = attributes[key];
    }
    return el;
}