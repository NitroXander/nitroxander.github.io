<template>
    <div v-if="isVisible" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow-y: hidden;">
        <div class="flex">
            <grid-layout :layout="layout" :col-num="40" :row-height="9" :max-cols="40"
                :is-draggable="draggable" :auto-size="true" :margin=[0,0] :is-resizable="resizable" 
                :is-bounded="bounded" :vertical-compact="false" :use-css-transforms="true">
                <grid-item v-for="(item, index) in returnLayout" :key="index" :static="item.static" :x="item.x" :max-h="99"
                    drag-allow-from=".header" drag-ignore-from=".no-drag" :y="item.y" :w="item.w"
                    :h="item.h" :i="item.i" style="touch-action: none; transform: none !important;">
                    <div class="bg-gray-200 rounded-lg " @dblclick="item.click" style="height: 90%;"
                        :class="{ 'vue-resizable-handle': isBorderHovered }" @mousemove="handleMouseMove"
                        @mouseout="handleMouseOut">
                        <div class="d-flex justify-space-between pa-2 rounded-t-lg bg-grey-darken-2 header">
                            <div class="d-flex ga-2">
                                <v-icon>mdi mdi-github</v-icon>
                                <p class="text-white text-large">{{ item.label }}</p>
                            </div>
                            <div class="d-flex ga-2">
                                <v-btn class="action-button pa-2" size="x-small" @click="minimizeItem(index)">
                                    <v-icon>mdi mdi-window-minimize</v-icon>
                                </v-btn>
                                <v-btn class="action-button pa-2" size="x-small" @click="maximizeItem(index)">
                                    <v-icon size="x-small">mdi mdi-window-restore</v-icon>
                                </v-btn>
                                <v-btn class="action-button pa-2" size="x-small" @click="removeItem(index)">
                                    <v-icon size="x-small">mdi mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                        <div class="w-full h-100 bg-grey rounded-b-lg pa-5 no-drag"
                            style="overflow-y: scroll; ">
                            <div class="d-flex flex-column " style="text-align: center;">
                                <p class="text-h2">My GitHub Profile</p>

                                <a href="https://github.com/NitroXander" target="_blank">
                                    <img src="https://avatars.githubusercontent.com/u/27045480?v=4" width="100"
                                        style="border-radius: 50%;" alt="NitroXander GitHub Avatar" />
                                    <p>@NitroXander</p>
                                </a>
                                <img src="https://ghchart.rshah.org/NitroXander" alt="NitroXander's GitHub chart" />
                                <p>See all contributions: <a href="https://github.com/NitroXander"
                                        target="_blank">github.com/NitroXander</a></p>
                                <p>> Over 500+ PRs contributed to private organization repositories.
                                </p>
                                <img src="https://github-readme-streak-stats.herokuapp.com/?user=NitroXander&theme=radical"
                                    alt="NitroXander's GitHub Streak" />

                                <p class="text-h2">My GitHub Trophies</p>
                                <img src="https://github-profile-trophy.vercel.app/?username=nitroxander"
                                    alt="NitroXander's GitHub Trophies" />
                            </div>
                        </div>
                    </div>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { GridMaker } from '@/helpers/GridMaker';

export default defineComponent({
    setup() {
        return {}
    },
    components: {
        GridLayout,
        GridItem,
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close', 'minimize'],
    watch: {
        isVisible(newVal: boolean) {
            if (newVal) {
                this.maximized = false
                if(this.layout.length == 0){
                    this.layout.push(this.desktopItem)
                }
            }
        }
    },
    data() {
        return {
            layout: [] as Array<GridMaker>,
            draggable: true,
            resizable: true,
            bounded: false,
            isBorderHovered: false,
            maximized: false,
            oldLocation: new GridMaker,
            desktopItem: {
                x: 10, y: 5, w: 20, h: 35, i: '0', static: false, label: 'GitHub', icon: 'folder.png'
                , click: this.folderClickFunction
            } as GridMaker,
        }
    },
    computed: {
        returnLayout() {
            return this.layout
        },
    },
    methods: {
        log(event: any) {
            console.log(event)
        },
        getImageName(name: string) {
            return new URL('../assets/icons/' + name, import.meta.url).href
        },
        folderClickFunction(event: any) {
            console.log('double clicked', event)
        },
        handleMouseMove(event: MouseEvent) {
            const target = event.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const borderWidth = 5; // Adjust based on your border thickness
            const { clientX, clientY } = event;

            // Check if mouse is near the border (within borderWidth pixels)
            const isNearBorder =
                clientX <= rect.left + borderWidth ||
                clientX >= rect.right - borderWidth ||
                clientY <= rect.top + borderWidth ||
                clientY >= rect.bottom - borderWidth;

            this.isBorderHovered = isNearBorder;
        },

        handleMouseOut() {
            this.isBorderHovered = false;
        },
        removeItem(index: number) {
            this.layout.splice(index, 1);
            this.maximized = false
            this.$emit('close')
        },
        maximizeItem(index: number) {
            if (!this.maximized) {
                this.oldLocation = { ...this.layout[index] }
                console.log("maximize", this.oldLocation)
                this.layout[index].x = 0
                this.layout[index].y = 0
                this.layout[index].w = 40
                this.layout[index].h = 99
                this.maximized = true
            }
            else {
                console.log("restore small", this.oldLocation)
                this.layout[index] = { ...this.oldLocation }
                this.maximized = false
            }
        },
        minimizeItem(index : number){
            this.$emit('minimize',index)
        }
    },
})
</script>