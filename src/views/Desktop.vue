<template>
  <div style="height:100vh; z-index: 0;overflow-y: hidden;">
    <div class="flex m-10">
      <grid-layout :layout="layout" :col-num="40" :row-height="30" :is-draggable="draggable" :auto-size="true" :margin="[40, 10]"
        :is-resizable="resizable" :is-bounded="bounded" :vertical-compact="false" :use-css-transforms="true">
        <grid-item v-for="(item, index) in returnLayout" :key="index" :static="item.static" :x="item.x" :y="item.y"
          :w="item.w" :h="item.h" :i="item.i" style="touch-action: none; transform: none !important;">
          <div class="bg-gray-200" @dblclick="item.click">
            <v-img :src="getImageName(item.icon)" :alt="item.icon" style="height: 5vh;"></v-img>
            <p class="text-white text-center">{{item.label}}</p>
          </div>
        </grid-item>
      </grid-layout>
    </div>
    <div style="justify-items: center; align-content: flex-end; height:8vh;">
       <StartMenu :items="desktopStore.openedWindows" @changeState="changeItemState"/>
    </div>
  </div>
  <Files style="z-index: 1; max-height: 95vh;" :isVisible="showDocs" @close="closeFiles" @minimize="minimizeFiles"></Files>
  <Github style="z-index: 1; max-height: 95vh;" :isVisible="showGithub" @close="closeGithub" @minimize="minimizeGithub"></Github>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import AppPill from '@/components/AppPill.vue'
import StartMenu from '@/components/StartMenu.vue';
import type { GridMaker } from '@/helpers/GridMaker';
import Files from '@/components/Files.vue';
import Github from '@/components/Github.vue';
import { useDesktopStore } from '@/store/desktopStore';

export default defineComponent({
  setup () {
    const desktopStore = useDesktopStore();
    return {
      desktopStore
    }
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
          {x: 0, y: 0, w: 2, h: 2, i: '0', static: false, label: 'Files', icon: 'folder' ,click: this.folderClickFunction},
          {x: 0, y: 2, w: 2, h: 2, i: '2', static: false, label: 'Github', icon: 'github' ,click: this.githubClickFunction},
        ] as Array<GridMaker>,
        draggable: true,
        resizable: false,
        bounded: false,
        showDocs: false,
        showGithub: false,
      }
    },
    computed: {
      returnLayout() {
        return this.layout
      },
      folderIcon() {
        return new URL('@/assets/icons/folder.png', import.meta.url).href
      },
      githubIcon() {
        return new URL('@/assets/icons/github.webp', import.meta.url).href
      }
    },
    methods: {
      log(event : any) {
        console.log(event)
      },
      minimizeFiles(){
        this.desktopStore.openedWindows.forEach(item => {
          if(item.itemName == 'Files'){
            item.itemState = 'minimized'
            this.showDocs = false
          }
        })
      },
      closeFiles(){
        this.showDocs = false

        // find docs on openedWindows and remove it
        this.desktopStore.openedWindows = this.desktopStore.openedWindows.filter(item => item.itemName != 'Files')
      },
      closeGithub(){
        this.showGithub = false

        // find docs on openedWindows and remove it
        this.desktopStore.openedWindows = this.desktopStore.openedWindows.filter(item => item.itemName != 'Github')
      },
      minimizeGithub(){
        this.desktopStore.openedWindows.forEach(item => {
          if(item.itemName == 'Github'){
            item.itemState = 'minimized'
            this.showGithub = false
          }
        })
      },
      getImageName(name: string) {
        if(name === 'folder') return this.folderIcon
        if(name === 'github') return this.githubIcon
      },
      folderClickFunction(event: any) {
        console.log('double clicked', event)
        const openedFile = this.desktopStore.openedWindows.find(item => item.itemName === "Files");
        if(openedFile){
          this.showDocs = true
        }
        else{
          console.log('adding new ')
          this.desktopStore.openedWindows.push({itemName:'Files', itemState: 'opened', icon : this.folderIcon})
          this.showDocs = true
        }
      },
      githubClickFunction(event: any) {
        console.log('double clicked', event)
        const opendedGit = this.desktopStore.openedWindows.find(item => item.itemName === "Github");
        if(opendedGit){
          this.showGithub = true
        }
        else{
          console.log('adding new ')
          this.desktopStore.openedWindows.push({itemName:'Github', itemState: 'opened', icon : this.folderIcon})
          this.showGithub = true
        }
      },
      changeItemState(index : number){
        if(this.desktopStore.openedWindows[index].itemState == 'minimized'){
          this.desktopStore.openedWindows[index].itemState = 'opened'
          if(this.desktopStore.openedWindows[index].itemName == 'Files') this.showDocs = true
          if(this.desktopStore.openedWindows[index].itemName == 'Github') this.showGithub = true
        }
        else{
          this.desktopStore.openedWindows[index].itemState = 'minimized'
          if(this.desktopStore.openedWindows[index].itemName == 'Files') this.showDocs = false
          if(this.desktopStore.openedWindows[index].itemName == 'Github') this.showGithub = false
        } 
      }
    },
})
</script>