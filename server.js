// 1. Opzetten van de webserver

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Maak een object aan voor favorites
let favorites = {}

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
// View engine zorgt ervoor dat data die je ophaalt uit de api , waar je in je code dingen mee doet, daar html van maakt
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));


/*** Routes & data ***/
const storyData = await fetchJson(apiUrl + '/tm_story')

// Maak een GET route voor de index
// Stap 1
app.get('/', function(request, response) {
  response.render('index')
})

// Stap 2
app.get('/lessons', function(request, response) {
  Promise.all([
  fetchJson('https://fdnd-agency.directus.app/items/tm_story?fields=*,image.id,image.height,image.width'),
  fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
  fetchJson('https://fdnd-agency.directus.app/items/tm_playlist?fields=*,image.id,image.height,image.width'),
  fetchJson('https://fdnd-agency.directus.app/items/tm_audio')]).then(([storyData, languageData, playlistData, audioData]) => { 
    
    // like array toegevoegd worden op de API data...
    playlistData.data = playlistData.data.map((item)=>{
      item.liked = favorites[item.id] || false
      return item
    })

  response.render('lessons', {
      stories: storyData.data, 
      language: languageData.data,
      playlist: playlistData.data,
      audio: audioData.data,
      favorites: favorites
    })
  })
})

app.get('/allstories', function(request, response) {
  Promise.all([
  fetchJson('https://fdnd-agency.directus.app/items/tm_story?fields=*,image.id,image.height,image.width'),
  fetchJson('https://fdnd-agency.directus.app/items/tm_language')]).then(([storyData, languageData]) => { 
  response.render('allstories', {stories: storyData.data, 
      language: languageData.data})
  });
})

// Maak een POST route voor de lessons pagina

app.post('/:playlistId/like-or-unlike', function(request, response) {
    const playlistId = Number(request.params.playlistId);
    const action = request.body.action; // Retrieve the value of the 'actie' parameter from the form
  console.log(action, playlistId)
    // Implement the logic to handle liking or unliking the playlist
    if (action === 'like') {
      // Handle 'like' action
      favorites[playlistId] = true
  
    } else if (action === 'unlike') {
      favorites[playlistId] = false
  
    } 
    response.redirect(303, '/lessons')
    })
  

// 3. Start de webserver
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})