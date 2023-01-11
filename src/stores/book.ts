import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { message } from "ant-design-vue";

import api from "@/utils/api";
import server from "@/utils/server";

export const useBookStore = defineStore("book", {
  state: () => ({
    list: [],
  }),
  actions: {
    async getBooks() {
      const res = await server.get(api.book.list());
      this.list = res.list;
    },
  },
});
