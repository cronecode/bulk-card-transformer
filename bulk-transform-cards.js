const yargs = require('yargs');
const fs = require('fs')

const argv = yargs
    .command('card-transform', 'Massages bulk data from Scryfall', {
        read: {
            description: 'the file to read from',
            alias: 'r',
            type: 'string',
        },
        write: {
          description: 'the file to write to',
          alias: 'w',
          type: 'string'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv._.includes('card-transform')) {
  const readPath = argv.read,
        writePath = argv.write,
        cards = JSON.parse(fs.readFileSync(readPath))

  const transformedCards = cards.map(card => ({
    scryfallId: card.id,
    scryfallUri: card.scryfall_uri,
    name: card.name,
    imageUris: card.image_uris,
    manaCost: card.mana_cost,
    type: card.type_line,
    oracleText: card.oracle_text,
    colorIdentity: card.colorIdentity,
    foil: card.foil,
    nonfoil: card.nonfoil,
    set: card.set_name,
    rarity: card.rarity,
    artist: card.artist
  }))

  fs.writeFileSync(writePath, JSON.stringify(transformedCards))

  console.log('Transform complete')
  fs.stat(readPath, function(err, stats) {
    console.log(`Original file size: ${stats.size / 1000000} MB`)
  })
  fs.stat(writePath, function(err, stats) {
    console.log(`New file size: ${stats.size / 1000000} MB`)
  })
}