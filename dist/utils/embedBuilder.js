"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedBuilder = void 0;
const index_1 = require("./index");
class EmbedBuilder {
    constructor() {
        this.timestamp = undefined;
        this.color = 0;
    }
    static randomHexColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let index = 0; index < 6; index++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    static convertRgb(dataColor) {
        const red = dataColor[0];
        const green = dataColor[1];
        const blue = dataColor[2];
        return (red << 16) + (green << 8) + blue;
    }
    static resolveColor(color) {
        let result = 0;
        if (typeof color === 'string') {
            const colorName = index_1.Util.colorConvert.keyword.rgb(color);
            const colorHex = index_1.Util.colorConvert.hex.rgb(color);
            if (colorName)
                result = EmbedBuilder.convertRgb(colorName);
            else if (!colorName && colorHex)
                result = EmbedBuilder.convertRgb(colorHex);
        }
        else if (Array.isArray(color)) {
            const colorHSL = index_1.Util.colorConvert.hsl.rgb(color);
            const colorXYZ = index_1.Util.colorConvert.xyz.rgb(color);
            if (colorHSL)
                result = EmbedBuilder.convertRgb(colorHSL);
            else if (!colorHSL && colorXYZ)
                result = EmbedBuilder.convertRgb(colorXYZ);
        }
        if (result < 0 || result > 0xffffff) {
            console.error('INVALID_COLOR_RANGE');
            return 0;
        }
        else if (Number.isNaN(result)) {
            console.error('INVALID_COLOR_CONVERT');
            return 0;
        }
        return result;
    }
    setColor(color) {
        const resolvableColor = EmbedBuilder.resolveColor(color);
        this.color = resolvableColor;
        return this;
    }
    setTimestamp(timestamp = undefined) {
        if (typeof timestamp !== 'number')
            this.timestamp = Date.now();
        else {
            const d = new Date(timestamp).getTime();
            if (d > 0)
                this.timestamp = timestamp;
            else
                this.timestamp = Date.now();
        }
        return this;
    }
    setTitle(title) {
        const normalizeTitle = title.trim().normalize('NFKD');
        this.title = normalizeTitle;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    setFooter(text, icon) {
        this.footer = { text, icon_url: icon };
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setAuthor(key, icon, url) {
        this.author = {
            name: key,
            icon_url: icon,
            url,
        };
        return this;
    }
    setImage(imageUrl, width, height) {
        this.image = {
            url: imageUrl,
            width,
            height,
        };
        return this;
    }
    addField(name, value, inline = false) {
        this.addFields({
            name,
            value,
            inline,
        });
    }
    addFields(...fields) {
        this.fields = fields.map((x) => this.fillField(x));
        return this;
    }
    build() {
        return {
            color: this.color,
            description: this.description,
            fields: this.fields,
            image: this.image,
            footer: this.footer,
            url: this.url,
            thumbnail: this.thumbnail,
            timestamp: this.timestamp
                ? new Date(this.timestamp).toISOString()
                : undefined,
        };
    }
    fillField(field) {
        if (!field.name || field.name.length)
            field.name = 'Empty key';
        else if (!field.value || field.value.length)
            field.value = 'Empty value';
        else if (field.inline && typeof field !== 'boolean')
            field.inline = false;
        return field;
    }
}
exports.EmbedBuilder = EmbedBuilder;
