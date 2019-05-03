import { Utils } from "../../utils/Utils";
import { PointerEventHandler } from "../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler";
import { CFlatGrid } from "../../../CanvasComponents/FlatGrid/CFlatGrid";

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
    }

    public initialize() {
        // const reduxTestDb: ReduxTestDb = new ReduxTestDb();
        // CommunicationService.setDataProvider(reduxTestDb.getStore());
        // CommunicationService.createAvgSummaryTable("main", "country", "price");

        const canvasFlatGridComponent: CFlatGrid = new CFlatGrid();
        canvasFlatGridComponent.createViewport({ container: this.bodyElement });
    }
}