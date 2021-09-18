export interface EmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
};

export type AllowedMentions = 'everyone' | 'roles' | 'users';