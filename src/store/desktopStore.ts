import { defineStore } from "pinia";
import type { WindowItems } from '@/helpers/WindowItems';

export const useDesktopStore = defineStore("desktop", {
  state: () => ({
    openedWindows: [] as Array<WindowItems>,
  }),
});