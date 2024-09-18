import NCS from './index.js'
import path from 'path'


const __dirname = path.resolve()

const pluginDirectory = process.env.PLUGIN_DIRECTORY || 'plugins'

const pluginPath = path.join(__dirname, pluginDirectory)


NCS.init(pluginPath)

NCS.start()