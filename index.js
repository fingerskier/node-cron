import cron from 'node-cron'
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const tasks = new Map()


function register(pluginPath) {
  const pluginUrl = pathToFileURL(pluginPath).href
  
  import(pluginUrl)
    .then(res => {
      const plugin = res.default
      
      if (plugin.cron && plugin.task) {
        const task = cron.schedule(plugin.cron, plugin.task)
        
        tasks.set(plugin.name || pluginPath, task)
        
        console.log(`Scheduling plugin: ${plugin.name || pluginPath} @ ${plugin.cron}`)
      } else {
        console.warn(`Invalid plugin format in file: ${pluginPath}`)
      }
    })
    .catch((error) => {
      console.error(`Error loading plugin from path: ${pluginPath}`, error)
    })
}


function init(mainPath) {
  fs.readdirSync(mainPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const pluginPath = path.join(mainPath, file);
      register(pluginPath);
    }
  })
}


function stop() {
  for (const [name, task] of tasks) {
    task.stop()
    console.log(`Stopped task: ${name}`)
  }
}


function start() {
  for (const [name, task] of tasks) {
    task.start()
    console.log(`Started task: ${name}`)
  }
}


export default {
  init,
  start,
  stop,
}