import { defineStore } from 'pinia'
import Message from '~/types/Message'
import UserId from '~/types/UserId'


const messageStore = defineStore({
   id:"message",

   state: () => ({
      items: [] as Message[]
   }),

   getters: {},

   actions: {
      push_message(user_id: UserId, self: boolean, content?: string , img?: string, audioSrc?: string) {
         const today = new Date();
         const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
         const message = {
            id: Math.floor(Math.random() * (50000 - 100) + 100),
            user_id: user_id,
            content: content,
            img: img,
            self: self,
            date: date,
            audioSrc: audioSrc
         }
         this.items.push(message)

      },
      delete_message(id: number) {
         const message = this.items.find((message) => message.id === id)
         const index = this.items.indexOf(message as Message) as number
         if (index > -1) {
            this.items.splice(index, 1)
         }
      }
   }

})

export default messageStore