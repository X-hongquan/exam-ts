import { createRouter, createWebHistory } from "vue-router"

import Login from "@/pages/Login.vue"
import Home from "@/pages/Home.vue"
import Task from "@/pages/Task.vue"
import Test from "@/pages/Test.vue"
import Student from "@/pages/Student.vue"
import PlayScore from "@/pages/PlayScore.vue"
import Analyse from "@/pages/Analyse.vue"
import User from "@/pages/User.vue"
import MakeTest from "@/pages/MakeTest.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "make",
          name: "make",
          component: MakeTest,
        },
        {
          path: "/",
          name: "task",
          component: Task,
        },
        {
          path: "test",
          name: "test",
          component: Test,
        },
        {
          path: "student",
          name: "student",
          component: Student,
        },
        {
          path: "play",
          name: "play",
          component: PlayScore,
        },
        {
          path: "analyse",
          name: "analyse",
          component: Analyse,
        },
        {
          path: "user",
          name: "user",
          component: User,
        },
      ],
    },
  ],
})
export default router
