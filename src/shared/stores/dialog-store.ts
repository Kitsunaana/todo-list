import { makeAutoObservable } from "mobx";

export interface UpsertDialogMethods {
  onOpen: (number?: number) => void;
  onClose: () => void;
  id?: number
  isOpenEdit: boolean
  isOpenCreate: boolean
}

export class DialogStore implements UpsertDialogMethods {
  isOpenCreate = false
  isOpenEdit = false
  id: number | undefined = undefined

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  onClose() {
    this.isOpenCreate = false
    this.isOpenEdit = false
    this.id = undefined
  };

  onOpen(id?: number) {
    if (id) {
      this.id = id
      this.isOpenEdit = true
    } else {
      this.isOpenCreate = true
    }
  };
}

export const createDialogStore = () => new DialogStore()