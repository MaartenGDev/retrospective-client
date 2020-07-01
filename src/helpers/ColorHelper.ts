import colorTool from 'tinycolor2';

export class ColorHelper {
    static lighten(color: string, alpha: number) {
        return colorTool(color).setAlpha(alpha).toString("rgb");
    }
}