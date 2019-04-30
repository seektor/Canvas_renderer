export enum PointerEventType {
    ActionStart = 'ActionStart',
    ActionMove = 'ActionMove',
    ActionEnd = 'ActionEnd',
    ActionShot = 'ActionShot',
}

export type BasePointerEventType = PointerEventType.ActionStart | PointerEventType.ActionMove | PointerEventType.ActionEnd;