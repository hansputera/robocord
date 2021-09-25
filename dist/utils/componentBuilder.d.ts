import type { APIActionRowComponent, APIButtonComponent, APIMessageComponentEmoji, APISelectMenuComponent, APISelectMenuOption } from 'discord-api-types';
import type { MessageComponentButtonStyle, MessageComponentType } from '../typings';
declare class ComponentBuilder {
    private type;
    constructor(type: MessageComponentType);
    getTypeInteger(): number;
}
export declare class MenuComponentBuilder extends ComponentBuilder {
    protected menus: APISelectMenuOption[];
    protected id?: string;
    protected label?: string;
    protected minValues: number;
    protected maxValues: number;
    protected placeholder?: string;
    protected isDisabled: boolean;
    constructor();
    setLabel(label: string): this;
    setPlaceholder(placeholder: string): this;
    toggle(): this;
    setMinValues(num: number): this;
    setMaxValues(num: number): this;
    createInstance(label: string, value: string, description?: string): MenuBuilder;
    addInstances(...instances: MenuBuilder[]): void;
    build(): APISelectMenuComponent;
}
export declare class MenuBuilder {
    protected label: string;
    protected value: string;
    protected description?: string;
    protected emoji?: APIMessageComponentEmoji;
    protected isDefault: boolean;
    constructor(label: string, value: string, description?: string);
    setEmoji(name: string, id?: string, isAnimated?: boolean): this;
    setAsDefault(): this;
    toJSON(): APISelectMenuOption;
}
export declare class ButtonBuilder {
    protected url?: string;
    protected emoji?: APIMessageComponentEmoji;
    protected label?: string;
    protected style?: number;
    protected id?: string;
    protected isDisabled: boolean;
    setStyle(style: MessageComponentButtonStyle): this;
    setURL(url: string): this;
    setEmoji(name: string, id?: string, isAnimated?: boolean): this;
    setID(id: string): this;
    setLabel(label: string): this;
    toggle(): this;
    toJSON(): APIButtonComponent;
}
export declare class ActionRowButtonBuilder extends ComponentBuilder {
    protected components: APIActionRowComponent[];
    constructor();
    /**
     * Create action row button instance.
     *
     * @param type - Create button instance with button type you want.
     */
    createInstance(): ActionRowButtonComponentBuilder;
    /**
     * Add action row button instance(s).
     *
     * @param instances - List of action row button instances.
     */
    addInstance(...instances: ActionRowButtonComponentBuilder[]): void;
    build(): APIActionRowComponent[];
}
declare class ActionRowButtonComponentBuilder {
    protected childComponents: APIButtonComponent[] | APISelectMenuComponent[];
    /**
     * Create child action row instance button.
     */
    createChildInstance(instanceType: Exclude<MessageComponentType, 'action'>): ButtonBuilder | MenuComponentBuilder;
    /**
     * Add your child instance(s).
     *
     * @param childInstances - List of action child action row button instance.
     */
    addChildInstance(...childInstances: ButtonBuilder[] | MenuBuilder[]): void;
    toJSON(): APIActionRowComponent;
}
export {};
