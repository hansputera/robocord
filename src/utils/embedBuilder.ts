import { Util } from './index';
import type { KEYWORD, RGB, HSL, XYZ } from 'color-convert/conversions';
import type {
  APIEmbed,
  APIEmbedAuthor,
  APIEmbedField,
  APIEmbedFooter,
  APIEmbedImage,
  APIEmbedThumbnail,
} from 'discord-api-types';
import type { EmbedFieldData } from '../typings';

export class EmbedBuilder {
  protected title?: string;
  protected description?: string;
  protected url?: string;
  protected timestamp: number = undefined;
  protected color?: number = 0;
  protected thumbnail?: APIEmbedThumbnail;
  protected footer?: APIEmbedFooter;
  protected author?: APIEmbedAuthor;
  protected image?: APIEmbedImage;
  protected fields?: APIEmbedField[];

  static randomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let index = 0; index < 6; index++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static convertRgb(dataColor: RGB) {
    const red = dataColor[0];
    const green = dataColor[1];
    const blue = dataColor[2];

    return (red << 16) + (green << 8) + blue;
  }

  static resolveColor(color: KEYWORD | HSL | XYZ): number {
    let result = 0;

    if (typeof color === 'string') {
      const colorName = Util.colorConvert.keyword.rgb(color as KEYWORD);
      const colorHex = Util.colorConvert.hex.rgb(color as string);

      if (colorName) result = EmbedBuilder.convertRgb(colorName);
      else if (!colorName && colorHex)
        result = EmbedBuilder.convertRgb(colorHex);
    } else if (Array.isArray(color)) {
      const colorHSL = Util.colorConvert.hsl.rgb(color as HSL);
      const colorXYZ = Util.colorConvert.xyz.rgb(color as XYZ);

      if (colorHSL) result = EmbedBuilder.convertRgb(colorHSL);
      else if (!colorHSL && colorXYZ)
        result = EmbedBuilder.convertRgb(colorXYZ);
    }

    if (result < 0 || result > 0xffffff) {
      console.error('INVALID_COLOR_RANGE');
      return 0;
    } else if (Number.isNaN(result)) {
      console.error('INVALID_COLOR_CONVERT');
      return 0;
    }
    return result;
  }

  setColor(color: string | HSL | XYZ) {
    const resolvableColor = EmbedBuilder.resolveColor(
      color as KEYWORD | HSL | XYZ
    );
    this.color = resolvableColor;
    return this;
  }

  setTimestamp(timestamp: number = undefined) {
    if (typeof timestamp !== 'number') this.timestamp = Date.now();
    else {
      const d = new Date(timestamp).getTime();
      if (d > 0) this.timestamp = timestamp;
      else this.timestamp = Date.now();
    }

    return this;
  }

  setTitle(title: string) {
    const normalizeTitle = title.trim().normalize('NFKD');
    this.title = normalizeTitle;
    return this;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  setThumbnail(url: string) {
    this.thumbnail = { url };
    return this;
  }

  setFooter(text: string, icon?: string) {
    this.footer = { text, icon_url: icon };
    return this;
  }

  setURL(url: string) {
    this.url = url;
    return this;
  }

  setAuthor(key: string, icon?: string, url?: string) {
    this.author = {
      name: key,
      icon_url: icon,
      url,
    };
    return this;
  }

  setImage(imageUrl: string, width?: number, height?: number) {
    this.image = {
      url: imageUrl,
      width,
      height,
    };
    return this;
  }

  addField(name: string, value: string, inline = false) {
    this.addFields({
      name,
      value,
      inline,
    });
  }

  addFields(...fields: EmbedFieldData[]) {
    this.fields = fields.map((x) => this.fillField(x));
    return this;
  }

  build(): APIEmbed {
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

  private fillField(field: EmbedFieldData) {
    if (!field.name || field.name.length) field.name = 'Empty key';
    else if (!field.value || field.value.length) field.value = 'Empty value';
    else if (field.inline && typeof field !== 'boolean') field.inline = false;
    return field;
  }
}
