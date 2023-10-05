import { ref} from "vue"
import { defineStore } from "pinia"
import { getMeAPI } from "@/apis/user"
import { User,R } from "@/model"



export const useUserStore = defineStore("user", () => {
  const user = ref({} as User)
  const getUser = async () => {
  const r:R<User>= (await getMeAPI()).data
  user.value=r.data
  }
  return { user, getUser }
})
