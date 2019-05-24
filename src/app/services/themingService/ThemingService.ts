import { Observable, Subject } from "rxjs";
import { ThemeType } from "./structures/ThemeType";
import { TThemeStyles } from "./structures/TThemeStyles";
import DarkTheme from "./themes/DarkTheme";
import LightTheme from "./themes/LightTheme";

class ThemingService {

    public readonly onThemeDidChange$: Observable<void>;
    private readonly themeDidChange$: Subject<void>;

    public static getInstance(): ThemingService {
        return this.instance || (this.instance = new this());
    }

    private static instance: ThemingService;
    private themeName: ThemeType;
    private theme: TThemeStyles;

    private constructor() {
        this.themeDidChange$ = new Subject();
        this.onThemeDidChange$ = this.themeDidChange$.asObservable();
        this.themeName = ThemeType.Dark;
        this.theme = DarkTheme;
    }

    public toggleTheme(): void {
        this.themeName = this.themeName === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark;
        this.theme = this.themeName === ThemeType.Dark ? DarkTheme : LightTheme;
        this.themeDidChange$.next();
    }

    public getTheme(): TThemeStyles {
        return this.theme;
    }
}

export default ThemingService.getInstance();