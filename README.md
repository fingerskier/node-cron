# node-cron-server

## Setup

Install and import `node-cron-server`.
Have a directory to house your plugins.
- Put secondary modules somewhere else so they don't clutter the auto-run mechanism.
Pass your plugins path as an argument to `NCS.main(...)`.
Run you main `js` script somehow, somewhere...


```javascript
import NCS from 'node-cron-server'
import path from 'path'

const __dirname = path.resolve()
const pluginDirectory = process.env.PLUGIN_DIRECTORY || 'plugins'
const pluginPath = path.join(__dirname, pluginDirectory)

NCS.init(pluginPath)
NCS.start()
```


## Plugins

This is the expected format for a plugin:

```javascript
const self = {
    name: 'Plugin Name',
    description: 'Plugin Description',
    
    // cron time format, see https://www.npmjs.com/package/node-cron
    cron: '0 0 0 * * *', // every day at midnight
    
    task: async function() {
        console.log(`${self.name} is running`)
    }
}

export default self
```

Every `js` file in the `plugins` directory is auto-run.


## Example App

```javascript
import dotenv from 'dotenv'
import NCR from 'node-cron-runner'
import path from 'path'

dotenv.config()


const __dirname = path.resolve()

const pluginDirectory = process.env.PLUGIN_DIRECTORY

const pluginPath = path.join(__dirname, pluginDirectory)


NCR.init(pluginPath)

NCR.start()
```
