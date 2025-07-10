<template>
    <div class="start-menu ga-2">
        <v-btn flat class="start-btn">
            <v-icon>mdi mdi-apps</v-icon>
            <p class="text-h6 font-weight-bold">Start</p>
        </v-btn>
        <div class="ga-2" v-for="(opendedWindows, index) in items" :key="index">
            <v-btn flat class="start-btn" @click="changeState(index)" :variant="opendedWindows.itemState == 'opened' ? 'outlined' : undefined">
                <v-icon>
                    <v-img :src="opendedWindows.icon"></v-img>
                </v-icon>
                <p class="ml-2 text-h6 font-weight-bold">{{ opendedWindows.itemName }}</p>
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { WindowItems } from '@/helpers/WindowItems';
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {}
    },
    props: {
        items :{
            type : Array<WindowItems>,
            default :[]
        }
    },
    emits :['changeState'],
    methods:{
        changeState(index :number){
            this.$emit('changeState', index)
        }
    }
})
</script>
