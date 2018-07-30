const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, map, nonce, user, difficulty, latitude, longitude, attribute) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.map = map;
        this.nonce = nonce;
        this.user=user;
        this.difficulty = difficulty || DIFFICULTY;
        this.latitude=latitude;
        this.longitude=longitude;
        this.attribute=attribute;
      }


      toString() {
        return `Block -
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash.substring(0, 10)}
          Hash      : ${this.hash.substring(0, 10)}
          Nonce     : ${this.nonce}
          User      : ${this.user}
          Difficulty: ${this.difficulty}
          Map       : ${this.map}
          Laitude   : ${this.latitude}
          Longitude : ${this.longitude}
          Attribute : ${this.attribute}`;
      }

   static genesis()
   {
       return new this('Genesis time', '-------', 'McGill-Laval', 'Map Theme', 0, 'Jin', DIFFICULTY, 0, 0, 'The Theme');
   }

   static mineBlock(lastBlock, user, latitude, longitude, attribute)
   {

        let hash;
        let timestamp;
        const lastHash=lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce=0;

        do 
        {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, nonce, difficulty, user, latitude, longitude, attribute);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, '', nonce, user , difficulty, latitude, longitude, attribute);

   }

   static hash(timestamp, lastHash, map, nonce, difficulty, user, latitude, longitude, attribute)
    {
	    return SHA256(`${timestamp}${lastHash}${map}${nonce}${difficulty}${user}${latitude}${longitude}${attribute}`).toString();
    }


    static blockHash(block) 
    {
        const { timestamp, lastHash, map, nonce, difficulty,latitude, longitude, attribute } = block;
        return Block.hash(timestamp, lastHash, map, nonce, difficulty, latitude, longitude, attribute);
    }

    static adjustDifficulty(lastBlock, currentTime) 
    {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}


module.exports = Block;