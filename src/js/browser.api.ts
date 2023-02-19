import _ from 'underscore'

export type TabObject = {
  url: string
}

class BrowserApi {
  public isInit : boolean

  constructor() {
    try {
      if(!chrome) {
        this.isInit = false
      } else {
        this.isInit = true	
      }
    } catch {
      this.isInit = false
    }
  }

  public async getTab(active?: boolean) : Promise<TabObject | null> {
    const tabs = await chrome.tabs.query({active: active, lastFocusedWindow: true})
    const tab = tabs[0]
    if(tab && tab.url) {
      return {
        url: tab.url
      }
    }
    return null
  }

  public extensionId() {
    return chrome.runtime.id
  }

  public async sendMessage(msg: AnyObject) : Promise<any> {
    const response = await chrome.runtime.sendMessage(this.extensionId(), msg)
  }

  public addListener(callback: (command: string, tab?: chrome.tabs.Tab) => void ) : void {
    return chrome.commands.onCommand.addListener(callback)
  }

  public onMessage(callback: (message: any, sender: chrome.runtime.MessageSender, sendResponse?: () => void) => boolean ) {
    return chrome.runtime.onMessage.addListener(callback)
  }

  public openExternal(url: string) {
    if(!this.isInit) return
    chrome.tabs.create({ url })
  }
  
}

export default new BrowserApi()