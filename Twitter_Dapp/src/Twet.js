const Twit = ({state}) => {
  // const [post,newpost] = useState(null);
  const Post1 = async (event) => {
    event.preventDefault();
    const {contract}=state;
      try {
        // const message = document.querySelector("#input2").value;
        // const amount = {value:ethers.utils.parseEther(0.001)};
        // const amount = BigNumber.from(0.001)
        // const amount = ethers.utils.formatUnits(0.0001);
        
        const name = document.querySelector("#input1").value;
        const transaction = await contract.posttweet(name);
        
        await transaction.wait();
        console.log("Transaction succesful");
        // console.log(contract.Ntweet[0].content);
      console.log(transaction);
      // newpost(transaction.data.toString());
    } catch (err) {
      console.error(err);
    //   alert(err.message);
    }
  }
  return (
    <>
      <form onSubmit={Post1}>
        <input id="input1" />
        {/* <input id="input2"/> */}
        <button type="submit">Submit</button>
      </form>
      </>
  )
}
export default Twit;