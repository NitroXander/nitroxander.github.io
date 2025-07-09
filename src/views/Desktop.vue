<template>
  <div style="height:100vh; z-index: 0;">
    <div class="flex m-10">
      <grid-layout :layout="layout" :col-num="40" :row-height="30" :is-draggable="draggable" :auto-size="true"
        :is-resizable="resizable" :is-bounded="bounded" :vertical-compact="false" :use-css-transforms="true">
        <grid-item v-for="(item, index) in returnLayout" :key="index" :static="item.static" :x="item.x" :y="item.y"
          :w="item.w" :h="item.h" :i="item.i">
          <div class="bg-gray-200" @dblclick="item.click">
            <v-img :src="getImageName(item.icon)" :alt="item.icon" style="height: 5vh;"></v-img>
            <p class="text-white text-center">{{item.label}}</p>
          </div>
        </grid-item>
      </grid-layout>
    </div>
    <div style="justify-items: center; align-content: flex-end; height:8vh;">
       <StartMenu/>
    </div>
  </div>
  <Files style="z-index: 1;" :isVisible="showDocs" @close="showDocs = false"></Files>
  <Github style="z-index: 1;" :isVisible="showGithub" @close="showGithub = false" frame-ancestors="none"></Github>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import AppPill from '@/components/AppPill.vue'
import StartMenu from '@/components/StartMenu.vue';
import type { GridMaker } from '@/helpers/GridMaker';
import Files from '@/components/Files.vue';
import Github from '@/components/Github.vue';

export default defineComponent({
  setup () {
    return {}
  },
  components: {
    StartMenu,
    AppPill,
    GridLayout,
    GridItem,
    Files,
    Github
  },
  data() {
      return {
        layout: [
          {x: 0, y: 0, w: 2, h: 2, i: '0', static: false, label: 'App', icon: 'folder.png' ,click: this.folderClickFunction},
          {x: 0, y: 2, w: 2, h: 2, i: '0', static: false, label: 'Github', icon: 'github.webp' ,click: this.githubClickFunction},
        ] as Array<GridMaker>,
        draggable: true,
        resizable: false,
        bounded: true,
        showDocs: false,
        showGithub: false,
      }
    },
    computed: {
      returnLayout() {
        return this.layout
      },
    },
    methods: {
      log(event : any) {
        console.log(event)
      },
      getImageName(name: string) {
        return new URL('../assets/icons/' + name, import.meta.url).href
      },
      folderClickFunction(event: any) {
        console.log('double clicked', event)
        this.showDocs = true
      },
      githubClickFunction(event: any) {
        console.log('double clicked', event)
        this.showGithub = true
      },
    },
})
</script>