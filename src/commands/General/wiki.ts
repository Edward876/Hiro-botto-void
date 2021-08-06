import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage,IParsedArgs } from '../../typings'
import wiki from 'wikipedia'
export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'wikipedia',
            description: 'Search anything in wikipedia',
            category: 'general',
            aliases: ['wiki'],
            usage: `${client.config.prefix}wiki [term]`,
            dm: true,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {


        if (!joined) return void M.reply('🔎 Provide a search term')
        const wikis = joined.trim()
try{

    const page = await wiki.page(wikis)
    const summary = await page.summary();
    return void M.reply( await request.buffer('https://www.rd.com/wp-content/uploads/2019/01/Wikipedia.jpg?fit=700,700'), MessageType.image, undefined, undefined, `―― ⌞WIKIPEDIA SEARCH⌝ ――\n\n⎚ *TITLE* : ${summary.title}\n⎚ *PAGE ID* : ${summary.pageid}\n⎚ *LANGUAGE* : ${summary.lang}\n⎚ *TIME STAMP* : ${summary.timestamp}\n⎚ *DESCRIPTION* : ${summary.description}\n\n⎚ *CONTEXT* : ${summary.extract}`)
    
} catch{
    return void M.reply(`ERROR!!!!`)
}
    }





}