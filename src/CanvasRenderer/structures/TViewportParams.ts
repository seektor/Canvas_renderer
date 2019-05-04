import { TStageParams } from './TStageParams';
import { StageCtor } from '../interfaces/StageCtor';
import { AbstractCanvasStage } from '../AbstractCanvasStage';

export interface TViewportParams {
    container: HTMLElement;
    stageParams?: TStageParams;
}

export interface TAbstractViewportParams<T extends AbstractCanvasStage> extends TViewportParams {
    mainStageCtor: StageCtor<T>;
}