<template>
    <div class="start-menu border-md ga-2">
        <v-btn flat class="start-btn" @click="openStartMenu = !openStartMenu">
            <v-icon>mdi mdi-apps</v-icon>
            <p class="text-h6 font-weight-bold">Start</p>
        </v-btn>
        <div class="ga-2" v-for="(opendedWindows, index) in items" :key="index">
            <v-btn flat class="start-btn" @click="changeState(index)"
                :variant="opendedWindows.itemState == 'opened' ? 'outlined' : undefined">
                <v-icon>
                    <v-img :src="opendedWindows.icon"></v-img>
                </v-icon>
                <p class="ml-2 text-h6 font-weight-bold">{{ opendedWindows.itemName }}</p>
            </v-btn>
        </div>

        <div class="custom-start-menu" v-if="openStartMenu">
            <div class="start-menu-title">
                <p class="text-md-h4">Kalana Jayaweera</p>
            </div>
            <div class="w-75 mt-5 ml-2">
                <v-btn class="power-button" flat block @click="closeSite">
                    <v-icon>mdi mdi-power</v-icon>Exit
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { WindowItems } from '@/helpers/WindowItems';
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return {}
    },
    props: {
        items: {
            type: Array<WindowItems>,
            default: []
        }
    },
    emits: ['changeState'],
    data() {
        return {
            openStartMenu: false
        }
    },
    methods: {
        changeState(index: number) {
            this.$emit('changeState', index)
        },
        closeSite() {
            // close the tab completely
            if (confirm("Leaving already? Hope you enjoyed it!")) {
                window.close();
                // Fallback if window.close() doesn't work
                setTimeout(() => {
                    if (!window.closed) {
                        alert("This tab cannot be closed programmatically. Please close it manually.");
                    }
                }, 100);
            }
        }
    }
})
</script>
