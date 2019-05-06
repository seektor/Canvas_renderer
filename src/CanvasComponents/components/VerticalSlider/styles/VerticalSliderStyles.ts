import DarkColors from '../../../../UIHelpers/DarkColors';

export interface TVerticalSliderStyles {
    colorBackground: string;
    colorTrack: string;
    colorInteractiveElement_1: string;
    colorInteractiveElement_2: string;
}

export default {
    colorBackground: DarkColors.DARKER_GREY,
    colorInteractiveElement_1: DarkColors.LIGHTER_GREY,
    colorInteractiveElement_2: DarkColors.LIGHT_GREY,
    colorTrack: DarkColors.DARK_GREY
} as TVerticalSliderStyles;