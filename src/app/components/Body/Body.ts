import { Utils } from "../../utils/Utils";
import { CStoc } from "../../../CanvasComponents/StressTestOnCombined/CStoc";
import { CPlayground } from "../../../CanvasComponents/Playground/CPlayground";
import { ReduxTestDb } from "../../../Database/Redux/TestDB/ReduxTestDb";
import CommunicationService from "../../services/communicationService/CommunicationService";
import { PointerEventHandler } from "../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler";
import { PointerEventType } from "../../../CanvasRenderer/utils/pointer-event-handler/structures/PointerEventType";
export class Body {

    private bodyElement: HTMLElement;
    private pointerEventHandler: PointerEventHandler;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(container: HTMLElement) {
        const template: string = require("./body.html");
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);

        // const reduxTestDb: ReduxTestDb = new ReduxTestDb();
        // CommunicationService.setDataProvider(reduxTestDb.getStore());
        // CommunicationService.createAvgSummaryTable("main", "country", "price");

        // new CPlayground(this.bodyElement);
    }
}