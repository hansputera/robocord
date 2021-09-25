"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRowButtonBuilder = exports.ButtonBuilder = exports.MenuBuilder = exports.MenuComponentBuilder = void 0;
const _1 = require(".");
const exception_1 = require("../exception/exception");
class ComponentBuilder {
    constructor(type) {
        this.type = type;
    }
    getTypeInteger() {
        return _1.Util.messageComponentTypes[this.type];
    }
}
// ----------------- MENU BUILDER ------------------------ //
class MenuComponentBuilder extends ComponentBuilder {
    constructor() {
        super('menu');
        this.menus = [];
        this.minValues = 0;
        this.maxValues = 25;
        this.isDisabled = false;
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    toggle() {
        this.isDisabled = !this.isDisabled;
        return this;
    }
    setMinValues(num) {
        if (num > 25)
            throw new exception_1.Exception('MENU_BUILDER', 'Min values cannot higher than 25');
        else if (num < 1)
            throw new exception_1.Exception('MENU_BUILDER', 'Min values cannot lower than 1');
        this.minValues = num;
        return this;
    }
    setMaxValues(num) {
        if (num > 25)
            throw new exception_1.Exception('MENU_BUILDER', 'Max values cannot higher than 25');
        else if (num < 1)
            throw new exception_1.Exception('MENU_BUILDER', 'Max values cannot lower than 1');
        this.maxValues = num;
        return this;
    }
    createInstance(label, value, description) {
        return new MenuBuilder(label, value, description);
    }
    addInstances(...instances) {
        instances.forEach((instance) => {
            this.menus.push(instance.toJSON());
        });
    }
    build() {
        return {
            type: this.getTypeInteger(),
            options: this.menus,
            custom_id: this.id,
            disabled: this.isDisabled,
            max_values: this.maxValues,
            min_values: this.minValues,
        };
    }
}
exports.MenuComponentBuilder = MenuComponentBuilder;
class MenuBuilder {
    constructor(label, value, description) {
        this.label = label;
        this.value = value;
        this.description = description;
        this.isDefault = false;
    }
    setEmoji(name, id, isAnimated = false) {
        this.emoji = { name, id, animated: isAnimated };
        return this;
    }
    setAsDefault() {
        this.isDefault = true;
        return this;
    }
    toJSON() {
        return {
            label: this.label,
            value: this.value,
            default: this.isDefault,
            emoji: this.emoji,
            description: this.description,
        };
    }
}
exports.MenuBuilder = MenuBuilder;
// -------------------------------------------------------------------------------- //
// ------------------- BUTTON BUILDER ------------------------------------ //
class ButtonBuilder {
    constructor() {
        this.url = '';
        this.isDisabled = false;
    }
    setStyle(style) {
        if (style === 'link' && !this.url.length) {
            throw new exception_1.Exception('BUTTON_STYLE', "Link style is require 'url' attribute!");
        }
        else {
            this.style = _1.Util.messageComponentButtonStyles[style];
        }
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setEmoji(name, id = undefined, isAnimated = false) {
        this.emoji = {
            name,
            id,
            animated: isAnimated,
        };
        return this;
    }
    setID(id) {
        this.id = id;
        return this;
    }
    setLabel(label) {
        this.label = label.trim().normalize('NFKD');
        return this;
    }
    toggle() {
        this.isDisabled = !this.isDisabled;
        return this;
    }
    toJSON() {
        var _a, _b, _c;
        return {
            custom_id: (_a = this.id) !== null && _a !== void 0 ? _a : _1.Util.lodash.random(10, 20).toString(36).slice(-5),
            style: (_b = this.style) !== null && _b !== void 0 ? _b : _1.Util.messageComponentButtonStyles['primary'],
            type: 2,
            url: this.url,
            emoji: this.emoji,
            disabled: this.isDisabled,
            label: (_c = this.label) !== null && _c !== void 0 ? _c : 'A button',
        };
    }
}
exports.ButtonBuilder = ButtonBuilder;
// ------------------------------------------------------------------------------- //
// -------------------------- ACTION BUTTON BUILDER ------------------------------------ //
class ActionRowButtonBuilder extends ComponentBuilder {
    constructor() {
        super('action');
        this.components = [];
    }
    /**
     * Create action row button instance.
     *
     * @param type - Create button instance with button type you want.
     */
    createInstance() {
        return new ActionRowButtonComponentBuilder();
    }
    /**
     * Add action row button instance(s).
     *
     * @param instances - List of action row button instances.
     */
    addInstance(...instances) {
        if (this.components.length > 5 || instances.length > 5) {
            throw new exception_1.Exception('ACTION_ROW_INSTANCE', 'Action row instance maximum reached');
        }
        else {
            instances.forEach((instance) => this.components.push(instance.toJSON()));
        }
    }
    build() {
        return this.components;
    }
}
exports.ActionRowButtonBuilder = ActionRowButtonBuilder;
class ActionRowButtonComponentBuilder {
    constructor() {
        this.childComponents = [];
    }
    /**
     * Create child action row instance button.
     */
    createChildInstance(instanceType) {
        if (instanceType === 'button') {
            return new ButtonBuilder();
        }
        else if (instanceType === 'menu') {
            return new MenuComponentBuilder();
        }
        else {
            return undefined;
        }
    }
    /**
     * Add your child instance(s).
     *
     * @param childInstances - List of action child action row button instance.
     */
    addChildInstance(...childInstances) {
        childInstances.forEach((instance) => {
            this.childComponents.push(instance.toJSON());
        });
    }
    toJSON() {
        return {
            type: 1,
            components: this.childComponents,
        };
    }
}
