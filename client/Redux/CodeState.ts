import { createStore } from "redux";
import { CodeModel } from "../Models/code-model";

// Global State for the code

// 1. Global State - the global data:
export class CodeState {
    public code: CodeModel = new CodeModel();
    public question: string;
    public isFirst: boolean = (sessionStorage.getItem("isFirst") > "");
}

// 2. Action Type - a list of operations we can perform on the data:
export enum CodeActionType {
    FetchCode = "FetchCode",
    AddCode = "AddCode",
    AddQuestion = "AddQuestion",
    AddIsFirst = "AddIsFirst",
    DeleteCode = "DeleteCode"
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface CodeAction {
    type: CodeActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function CodeReducer(currentState = new CodeState(), action: CodeAction): CodeState {

    const newState = { ...currentState };

    switch (action.type) {

        case CodeActionType.FetchCode:
            newState.code = action.payload;
            break;

        case CodeActionType.AddCode:
            newState.code = action.payload;
            break;

        case CodeActionType.AddQuestion:
            newState.question = action.payload;
            break;

        case CodeActionType.AddIsFirst:
            newState.isFirst = action.payload;
            const isFirstFromStorage = sessionStorage.getItem("isFirst");
            if(isFirstFromStorage){newState.isFirst = true}
            break;

        case CodeActionType.DeleteCode:
            newState.code = null;
            break;

    }

    return newState;
}

// 5. Store - manager object from Redux library which handles the entire operation:
export const codeStore = createStore(CodeReducer); // Production
