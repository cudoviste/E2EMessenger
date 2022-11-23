import { readable, writable } from "svelte/store";
import _io from "socket.io-client"
import CryptoJS, { enc } from "crypto-js";
/**
 * 
 *{
 *     from : "me" | string
 *     message : encrypted
 *     time: Date.now()
 * }
 */



const createIoStore =() => {
   const client = _io("http://localhost:3000")
    client.on("message", message => {
    console.log(message)
    
    const salt = String( message.message).substring(0, 6)
    const encrypted = String(message.message).substring(6,)
    const decrypted = CryptoJS.AES.decrypt(encrypted, salt).toString(CryptoJS.enc.Utf8);
    message.message = decrypted
    messages.update(msgs => [...msgs, message])
    message = ""
}) 

return writable(client)
}
export const io = createIoStore()

export const messages = writable([])