/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppBoard {
    }
    interface AppDie {
        "locked": boolean;
        "position": number;
        "value": number;
    }
    interface AppScoreItem {
        "disabled": boolean;
        "label": string;
        "score": number;
    }
    interface AppScores {
        "rolled": boolean;
    }
}
declare global {
    interface HTMLAppBoardElement extends Components.AppBoard, HTMLStencilElement {
    }
    var HTMLAppBoardElement: {
        prototype: HTMLAppBoardElement;
        new (): HTMLAppBoardElement;
    };
    interface HTMLAppDieElement extends Components.AppDie, HTMLStencilElement {
    }
    var HTMLAppDieElement: {
        prototype: HTMLAppDieElement;
        new (): HTMLAppDieElement;
    };
    interface HTMLAppScoreItemElement extends Components.AppScoreItem, HTMLStencilElement {
    }
    var HTMLAppScoreItemElement: {
        prototype: HTMLAppScoreItemElement;
        new (): HTMLAppScoreItemElement;
    };
    interface HTMLAppScoresElement extends Components.AppScores, HTMLStencilElement {
    }
    var HTMLAppScoresElement: {
        prototype: HTMLAppScoresElement;
        new (): HTMLAppScoresElement;
    };
    interface HTMLElementTagNameMap {
        "app-board": HTMLAppBoardElement;
        "app-die": HTMLAppDieElement;
        "app-score-item": HTMLAppScoreItemElement;
        "app-scores": HTMLAppScoresElement;
    }
}
declare namespace LocalJSX {
    interface AppBoard {
    }
    interface AppDie {
        "locked"?: boolean;
        "onLockDie"?: (event: CustomEvent<object>) => void;
        "position"?: number;
        "value"?: number;
    }
    interface AppScoreItem {
        "disabled"?: boolean;
        "label"?: string;
        "onScoreSelected"?: (event: CustomEvent<boolean>) => void;
        "score"?: number;
    }
    interface AppScores {
        "rolled"?: boolean;
    }
    interface IntrinsicElements {
        "app-board": AppBoard;
        "app-die": AppDie;
        "app-score-item": AppScoreItem;
        "app-scores": AppScores;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-board": LocalJSX.AppBoard & JSXBase.HTMLAttributes<HTMLAppBoardElement>;
            "app-die": LocalJSX.AppDie & JSXBase.HTMLAttributes<HTMLAppDieElement>;
            "app-score-item": LocalJSX.AppScoreItem & JSXBase.HTMLAttributes<HTMLAppScoreItemElement>;
            "app-scores": LocalJSX.AppScores & JSXBase.HTMLAttributes<HTMLAppScoresElement>;
        }
    }
}
