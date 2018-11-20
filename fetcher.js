const Twitter = require("twitter")
const auth = {
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
}
const twitters = ["gvb_actueel", "htm_reisinfo", "retrotterdam"]

function fetcher(auth, twitters, amount) {

  const client = new Twitter({
    consumer_key: auth.consumer_key,
    consumer_secret: auth.consumer_secret,
    access_token_key: auth.access_token_key,
    access_token_secret: auth.access_token_secret
  })

  for (let handler = 0; handler < twitters.length; handler++) {
    let data = []
    client.get(`statuses/user_timeline.json?screen_name=${twitters[handler]}&count=${amount}`, (error, tweets, response) => {
      if (!error) {
        for (let post in tweets) {
          data.push({
            id: tweets[post].id,
            created_at: tweets[post].created_at,
            screen_name: tweets[post].user.screen_name,
            text: tweets[post].text,
            tweetUrl: `https://twitter.com/${tweets[post].user.screen_name}/status/${tweets[post].id_str}`,
            incidents: {}
          })
        }
      }
      console.log(data)
    })
  }
}

fetcher(auth, twitters, 5)

exports.module = fetcher