const fs = require( "fs" )
const Twitter = require( "twitter" )

const twitters = [ "gvb_actueel", "htm_reisinfo", "retrotterdam" ]

function fetcher( twitters, amount ) {
  fs.readFile( "keys.json", "utf8", ( error, data ) => {
    if ( error ) throw error
    keys = JSON.parse( data )

    const client = new Twitter( keys )

    for ( let handler = 0; handler < twitters.length; handler++ ) {
      let data = []
      client.get( `statuses/user_timeline.json?screen_name=${ twitters[handler] }&count=${ amount }`, ( error, tweets, response ) => {
        if (!error) {
          for ( let post in tweets ) {
            data.push( {
              id: tweets[post].id,
              created_at: tweets[post].created_at,
              screen_name: tweets[post].user.screen_name,
              text: tweets[post].text,
              tweetUrl: `https://twitter.com/${ tweets[post].user.screen_name }/status/${ tweets[post].id_str }`,
              incidents: {}
            } )
          }
        }
        console.log( data )
      })
    }
  })


}

// const client = new Twitter( auth )


fetcher( twitters, 5 )

exports.module = fetcher