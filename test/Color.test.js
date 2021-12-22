const Color = artifacts.require('./Color.sol')

require('chai').use(require('chai-as-promised')).should()


contract('Color',(accounts)=>{
  let contract

  before(async() => {
    contract = await Color.deployed()
  })

  describe('deployment',async()=>{
    it('deploys successfully',async() => {
      const address = contract.address
      console.log('address fetched at:' + address);
      assert.notEqual(address, 0x0)
      assert.notEqual(address,'')
      assert.notEqual(address,null)
      assert.notEqual(address,undefined)
    })

    it('has a name', async() => {
      const name = await contract.name()
      assert.equal(name,'Color')
    })

    it('has a symbol', async() => {
      const name = await contract.symbol()
      assert.equal(name,'COLOR')
    })
  })


  describe('minting',async()=>{
    it('creates a new token', async() => {
      const result = await contract.mint('#EC058E')
      console.log('just minted: ' + result);
      //Success
      assert.equal(result.logs[0].args.from,'0x0000000000000000000000000000000000000000','from the original coin')
      // Repeating at the same color should be rejected.
      await contract.mint('#EC058E').should.be.rejected;
      await contract.mint('#EC058F').should.not.be.rejected;
    })
  })

  describe('minting',async()=>{
    it('lists colors', async() => {
      await contract.mint('#SKI1')
      console.log('print out array ' + contract.aaa_array);
    })
  })
})