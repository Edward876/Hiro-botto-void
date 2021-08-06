import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage,IParsedArgs } from '../../typings'
import google from 'google-it'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'google',
            description: 'google search!!!',
            category: 'general',
            aliases: ['g'],
            usage: `${client.config.prefix}google`,
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('🔎 Provide a search term')
        const googleQuery = joined.trim()
        if(googleQuery == undefined || googleQuery == ' ') return void M.reply( `Error could not find a result from ${googleQuery}`)
        
        google({ 'query': googleQuery })
        .then(async ( results: string | any[]) => {

            let captserch = `𝐆𝐨𝐨𝐠𝐥𝐞 𝐬𝐞𝐚𝐫𝐜𝐡 𝐟𝐫𝐨𝐦 - ${googleQuery}\n`

            for (let i = 0; i < results.length; i++) {
                captserch +=  `\n🏷️ *Title*: ${results[i].title}\n✍ *Description*: ${results[i].snippet}\n🔗 *Link*: ${results[i].link}\n`

            }
            return void M.reply(captserch)
            
        }).catch((e: any) => {
            console.log(e)})

    }

}