<template>
   <li onmousedown="return false" class="w-full" :id="`pm-${props.message.id}`">
      <div :class="['my-2 relative', message.self ? 'float-right' : 'float-left']"
         @contextmenu.prevent="showOption = !showOption" @keydown="showOption = !showOption" 
      >
         <div v-if="!message.img"
          :class="['text-white pm rounded-t rounded-r-md rounded-b-lg rounded-bl-2xl px-4 pt-4 pb-2', message.self ? 'bg-blue-700' : 'bg-gray-700']">
            <p v-html="message.content" class="break-words"></p>
             <div><small v-text="props.message.date" class="text-gray-400"></small></div>
         </div>
         <div v-if="!message.audioSrc && message.img">
            <img :src="message.img" width="150" :alt="`image of ${message.img}`" 
            class="border border-gray-800 shadow-md shadow-gray-900 cursor-pointer" @click.stop="show_picture_option = true">
         </div>
         <div v-if="!message.img && message.audioSrc">
            <!-- TODO  custome of audio tag style -->
            <audio controls :src="message.audioSrc" class="w-[250px]"></audio>
         </div>
         <transition
         enter-active-class="animate__animated animate__zoomIn"
         leave-active-class="animate__animated animate__zoomOut"
         >
            <div v-if="showOption" :class="['absolute bg-gray-700 rounded-md top-0 w-16 p-1', message.self ? '-left-20' : '-right-20 ']">
               <ul class="w-full">
                  <li class="hover:bg-gray-600 text-white">
                     <button class="w-full py-2 px-1 hover:rounded-md" @click="delete_message(message.id)">حذف</button>
                  </li>
               </ul>
            </div>
         </transition>
   
         <modal :active="show_picture_option">
            <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl my-8 sm:max-w-xl sm:w-full"> 
               <img :src="message.img" v-click-outside="()=> show_picture_option = false"/>
            </div>
         </modal>
      
      </div>
   </li>
</template>

<script setup lang="ts">
import Message from '@/types/Message'
import messageStore from '@/stores/message'

//props

const props = defineProps<{
   message : Message
}>()



//emits



//data

let showOption = ref<boolean>(false)
const show_picture_option = ref<boolean>(false)



//hooks

onMounted(()=> {
   document.addEventListener('click', (e)=> {
      hide_option(e)
   })
    document.addEventListener('contextmenu', (e)=> {
      hide_option(e)
   })
})
onUnmounted(() => {
   document.removeEventListener('click',hide_option)
   document.removeEventListener('contextmenu',hide_option)
})




//methods

function show_option() : void {
   showOption.value = !showOption.value
}

function hide_option(e: any): void {
   if(!document.getElementById(`pm-${props.message.id}`)?.contains(e.target)){
      showOption.value = false
   }
}
async function delete_message(id: number): Promise<void> {
   // const deleteMessage = usePromis( apiServices.deleteMessage )
   // await deleteMessage.createPromis( id )
   // if(deleteMessage.result) {
   // }
   messageStore().delete_message(id)
   showOption.value = false
}

</script>

<style scoped lang="scss">
.pm {
   max-width: 250px;
}
</style>