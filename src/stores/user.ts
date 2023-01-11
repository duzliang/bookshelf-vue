import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { message } from "ant-design-vue";

import api from "@/utils/api";
import server from "@/utils/server";

export const useUserStore = defineStore("user", {
  actions: {
    async login(values: Object) {
      const res = await server.post(api.user.login(), values);
      if (res.status === "ok") {
        message.success("登录成功");
        localStorage.setItem("token", res.token);

        setTimeout(() => {
          this.$router.replace({ path: "/book/list" });
        }, 1000);
      }
    },
  },
});
