pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721{
  string[] public colorArray;
  uint[] public aaa_array;
  mapping(string => bool) public _colorExists;
  string public ttt;

  event DataStored(string val);

  constructor() ERC721("Color","COLOR") public {
  }

  // _color example: "#FFFFFF"
  function mint(string memory _color) public {
    //Require color is unique
    require(!_colorExists[_color]);
    aaa_array.push(112);

//    emit DataStored("SSSSEEESS emitting.......");

    colorArray.push(_color);//return i
    uint _id = colorArray.length;
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
    // Color - track it & add
    // Call the mint function
    // Color - track it
  }

  function setTTT() public {
    ttt = "ssss";
  }

}