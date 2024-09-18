import fs from 'fs'


const self = {
  name: 'Logger',
  description: 'Logs the help doc every minute',
  cron: '1 * * * * *',  // every minute
  task: () => {
    try {
      const helpDoc = fs.readFileSync('README.md', 'utf8')
      
      console.log(helpDoc)
    } catch (error) {
      console.error('Error logging help doc', error)
    }
  },
}


export default self