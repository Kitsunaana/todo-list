import { makeAutoObservable } from "mobx";

export interface UpsertDialogMethods {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isOpen: boolean
}

export class DialogStore implements UpsertDialogMethods {
  isOpen = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  onClose() {
    this.isOpen = false
  };

  onOpen() {
    this.isOpen = true
  };

  onToggle() {
    this.isOpen = !this.isOpen
  };
}

export const createDialogStore = () => new DialogStore()