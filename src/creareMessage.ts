import { createApp } from 'vue'
import Message from '@/components/Message.vue'
export type MessageType = 'success' | 'error' | 'default'
// 實例化 組件 CreactApp(組件,要傳入的參數)
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
    const messageInstance = createApp(Message, { message, type })
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    messageInstance.mount(mountNode)
    setTimeout(() => {
        //卸載mountNode
        messageInstance.unmount(mountNode)
        //把節點從body移除
        document.body.removeChild(mountNode)
    }, timeout)
}

export default createMessage