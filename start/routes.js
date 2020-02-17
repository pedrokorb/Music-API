'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Album = use('App/Models/Album')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get("/albums", async () => {
  const albums = await Album.query()
    .orderBy("id", "desc")
    .fetch()

    return albums;
})

Route.get("/albums/:id", async ({params}) => {
  const album = await Album.query()
    .with("songs")
    .where("id", params.id)
    .first()

  return album;
})
