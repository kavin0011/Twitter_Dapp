import { BrowserProvider, ethers } from "ethers";
import { useEffect, useState } from 'react';
import ABI from "./ABI.json";
import Gettweet from "./Gettweet";
import Twit from './Twet';
const App = ()=>{
        const [state,setstate1] = useState({
          provider:"",
          signer:"",
          contract:""
        });
        // const [contract_ins,newcontract_ins]= useState(null);
        const [account,setaccount]=useState("not connected");
        useEffect(()=>{
          const template =async () =>{
            const contractAddress="0xc190D7c38B07E65200909B58fD81d3ff90461488";
            const contractABI=ABI.abi;
            //metamask connection
            // let selectedAccount;
            try{
            const { ethereum } = window;
            const account = await ethereum.request({
              method:"eth_requestAccounts"
            })
            setaccount(account);
            let signer = null;

            let provider;
            
            if (window.ethereum == null) {
            
                console.log("MetaMask not installed; using read-only defaults")
                provider = ethers.getDefaultProvider()
            
            } else {
            
                provider = new BrowserProvider(window.ethereum)
                signer = await provider.getSigner();
            }

            const contract = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            )
            // newcontract_ins(contract);
              console.log(contract);
          setstate1({provider,signer,contract});

          }catch(e){
            alert(e);
          }
        }
      
          template();
      },[])

  return(
    <>
    <button>connect</button>
    <div>{account}</div>
    <Twit state={state}></Twit>
    <Gettweet state={state}></Gettweet>
    </>
)
}
export default App;