const Block =require('./block');


describe('Block', () => {

    let map, lastBlock, block; 

    beforeEach(() => {
         map = 'Jin';
         lastBlock=Block.genesis();
         block = Block.mineBlock(lastBlock, map);
    });


    it('sets the `map` to match the input', () => {

        expect(block.map).toEqual(map);

    });


    it('sets the `lastHash` to match the hash of last block ', () => {

        expect(block.lastHash).toEqual(lastBlock.hash);

    });

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        console.log(block.toString());
    });

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
    });
      
      it('raises the difficulty for quickly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
    });
});