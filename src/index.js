var Twitter = require('node-tweet-stream')
    , t = new Twitter({
    consumer_key: '7Ixba9BJWrGOxDjMYQCGKxVcR',
    consumer_secret: 'fKYsaGMz36b4odzpCPWKRlTTNRXoBcqpASSkQDSjztmF1oB3uI',
    token: '1269504528-DA42EtyEH1lkjmWr2MRXHLKfIqSOvW9ynmhvB8A',
    token_secret: 'rLGRcS09b5Vg2SL0vujJHurlOleIZm2ul6tRi87N9sqrp'
})

t.on('tweet', function (tweet) {
    console.log('tweet received', tweet)
})

t.on('error', function (err) {
    console.log('Oh no')
})

t.track('nodejs')
t.track('marine lepen')

// 5 minutes later
t.track('macron')

// 10 minutes later
t.untrack('psg')