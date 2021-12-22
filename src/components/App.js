import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  async loadWeb3(){
    //getting stuff from Metamask
    window.alert("Loading web3")
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }

  async loadBlockChainData(){
    const web3 = window.web3
    // load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})

    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = Color.networks[networkId]

    if(!networkData){
      // if network is not ready
      window.alert('network data is not ready!!')
    }

    const abi = Color.abi
    const address = networkData.address
    var contract = new web3.eth.Contract(abi, address)
    console.log(contract)
    // this.setState({ contract })

    //Load color
    const color = await contract.methods.colorArray(0).call()
    this.setState({
      colors:[...this.state.colors,color]
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      name: 'ethan',
      contract: null,
      colors: []
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color tokens {this.state.name}
            Account Here {this.state.account}
            Contract Here {this.state.contract}
          </a>

        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Ethan test</h1>
                Account Here {this.state.account}
                <p>
                  Color tokens {this.state.name}

                  Account Here {this.state.account}

                  Contract Here {this.state.contract}
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
