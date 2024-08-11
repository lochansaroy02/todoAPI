const zod   = require('zod')
  

const createToDo = zod.object(
{
    title : zod.string(),
    description: zod.string()
})
const updateToDo = zod.object(
{
    tid : zod.string()
})

module.exports = {
    createToDo : createToDo,
    updateToDo: updateToDo
}