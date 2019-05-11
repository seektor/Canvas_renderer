import { TThemeStyles } from "./structures/TThemeStyles";
import { ThemeType } from "./structures/ThemeType";
import DarkTheme from "./themes/DarkTheme";

class ThemingService {

    public static getInstance(): ThemingService {
        return this.instance || (this.instance = new this());
    }

    private static instance: ThemingService;
    private themeName: ThemeType;
    private theme: TThemeStyles;

    private constructor() {
        this.themeName = ThemeType.Dark;
        this.theme = DarkTheme;
        console.log(this.theme);
    }

    public getTheme(): TThemeStyles {
        return this.theme;
    }


}

export default ThemingService.getInstance();