import type { APIActionRowComponent, APIButtonComponent, APIMessageComponentEmoji, APISelectMenuComponent, APISelectMenuOption } from "discord-api-types";
import { Util } from ".";
import { Exception } from "../exception/exception";
import type { MessageComponentButtonStyle, MessageComponentType } from "../typings";

class ComponentBuilder {
    constructor(
        private type: MessageComponentType
    ) {};

    public getTypeInteger() {
        return Util.messageComponentTypes[this.type];
    }
}

// ----------------- MENU BUILDER ------------------------ //
export class MenuComponentBuilder extends ComponentBuilder {
    protected menus: APISelectMenuOption[] = [];
    protected id?: string;
    protected label?: string;
    protected minValues = 0;
    protected maxValues = 25;
    protected placeholder?: string;
    protected isDisabled = false;
    
    constructor() {
        super('menu');
    }

    setLabel(label: string) {
        this.label = label;
        return this;
    }

    setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        return this;
    }

    toggle() {
        this.isDisabled = !this.isDisabled;
        return this;
    }

    setMinValues(num: number) {
        if (num > 25) throw new Exception('MENU_BUILDER', 'Min values cannot higher than 25');
        else if (num < 1) throw new Exception('MENU_BUILDER', 'Min values cannot lower than 1');
        this.minValues = num;
        return this;
    }

    setMaxValues(num: number) {
        if (num > 25) throw new Exception('MENU_BUILDER', 'Max values cannot higher than 25');
        else if (num < 1) throw new Exception('MENU_BUILDER', 'Max values cannot lower than 1');

        this.maxValues = num;
        return this;
    }

    createInstance(label: string, value: string, description?: string): MenuBuilder {
        return new MenuBuilder(label, value, description);
    }

    addInstances(...instances: MenuBuilder[]) {
        instances.forEach(instance => {
            this.menus.push(instance.toJSON());
        });
    }

    build(): APISelectMenuComponent {
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

class MenuBuilder {
    protected emoji?: APIMessageComponentEmoji;
    protected isDefault = false;

    constructor(
        protected label: string,
        protected value: string,
        protected description?: string
    ) {};

    setEmoji(name: string, id?: string, isAnimated = false) {
        this.emoji = { name, id, animated: isAnimated };
        return this;
    }

    setAsDefault() {
        this.isDefault = true;
        return this;
    }

    toJSON(): APISelectMenuOption {
        return {
            label: this.label,
            value: this.value,
            default: this.isDefault,
            emoji: this.emoji,
            description: this.description,
        };
    }
}

// -------------------------------------------------------------------------------- //

// ------------------- BUTTON BUILDER ------------------------------------ //
class ButtonBuilder {
    protected url?: string = '';
    protected emoji?: APIMessageComponentEmoji;
    protected label?: string;
    protected style?: number;
    protected id?: string;
    protected isDisabled = false;

    setStyle(style: MessageComponentButtonStyle) {
        if (style === 'link' && !this.url.length) {
            throw new Exception('BUTTON_STYLE', 'Link style is require \'url\' attribute!');
        } else {
            this.style = Util.messageComponentButtonStyles[style];
        }
        return this;
    }

    setURL(url: string) {
        this.url = url;
        return this;
    }

    setEmoji(name: string, id: string = undefined, isAnimated = false) {
        this.emoji = {
            name,
            id,
            animated: isAnimated,
        };
        return this;
    };

    setID(id: string) {
        this.id = id;
        return this;
    }

    setLabel(label: string) {
        this.label = label.trim().normalize('NFKD');
        return this;
    }
    
    toggle() {
        this.isDisabled = !this.isDisabled;
        return this;
    }

    toJSON(): APIButtonComponent {
        if (!this.label) this.label = 'A button';
        return {
            custom_id: this.id,
            style: this.style,
            type: 2,
            url: this.url,
            emoji: this.emoji,
            disabled: this.isDisabled,
            label: this.label,
        };
    }
}

// ------------------------------------------------------------------------------- //


// -------------------------- ACTION BUTTON BUILDER ------------------------------------ //

export class ActionRowButtonBuilder extends ComponentBuilder {
    protected components: APIActionRowComponent[] = [];
    constructor() {
        super('action');
    }

    /**
     * Create action row button instance.
     * 
     * @param type - Create button instance with button type you want.
     */
    createInstance(type: Exclude<MessageComponentType, 'action'>): ActionRowButtonComponentBuilder {
        return new ActionRowButtonComponentBuilder(type);
    }

    addInstancePlain(...instances: APIButtonComponent[] | APISelectMenuComponent[]) {
        if (this.components.length > 5 || instances.length > 5) {
            throw new Exception('ACTION_ROW_INSTANCE', 'Action row instance maximum reached');
        } else {
            this.components.push({
                type: this.getTypeInteger(),
                components: instances,
            });
        }
    }

    /**
     * Add action row button instance(s).
     * 
     * @param instances - List of action row button instances.
     */
    addInstance(...instances: ActionRowButtonComponentBuilder[]) {
        if (this.components.length > 5 || instances.length > 5) {
            throw new Exception('ACTION_ROW_INSTANCE', 'Action row instance maximum reached');
        } else {
            instances.forEach(instance => this.components.push(instance.toJSON() as never));
        }
    }

    build(): APIActionRowComponent[] {
        return this.components;
    }
}

class ActionRowButtonComponentBuilder {
    protected childComponents: APIButtonComponent[] | APISelectMenuComponent[] = [];

    constructor(private instanceType: Exclude<MessageComponentType, 'action'>) {};

    /**
     * Create child action row instance button.
     */
    createChildInstance(): ButtonBuilder | MenuComponentBuilder {
        if (this.instanceType === 'button') {
            return new ButtonBuilder();
        } else if (this.instanceType === 'menu') {
            return new MenuComponentBuilder();
        } else {
            return undefined;
        }
    }

    /**
     * Add your child instance(s).
     * 
     * @param childInstances - List of action child action row button instance.
     */
    addChildInstance(...childInstances: ButtonBuilder[] | MenuBuilder[]) {
        childInstances.forEach(instance => {
            this.childComponents.push(instance.toJSON());
        });
    }

    toJSON(): APIActionRowComponent {
        return {
            type: 1,
            components: this.childComponents,
        };
    }
}
