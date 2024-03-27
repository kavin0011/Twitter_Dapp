// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract tweet{
    uint256 public maxl=150;
    struct Ntweet{
        uint256 id;
        address admin;
        string content;
        uint256 timestamp;
        uint256 likes;
    }
    address public owner;
    //  event tweetcreated(uint256 id,address admin,string content,uint256 timestamp, uint256 likes);
    constructor (){
        owner = msg.sender;
    }
    event tweetcreated(uint256 id,address admin,string content,uint256 timestamp,uint256 likes);
    event event_like(address liker,address admin,uint256 id ,uint256 likecount);
    modifier onlyowner{
        require(owner == msg.sender,"You are not the Owner");
        _;
    }
    function modify(uint256 newl)public onlyowner{
          maxl=newl;
    }
    mapping (address => Ntweet[])public tweets;

    function posttweet(string memory _user)public{
        require(bytes(_user).length<=maxl,"the length of tweet is more ");
        Ntweet memory newtweet= Ntweet({
            id:tweets[msg.sender].length,
            admin : msg.sender,
            content : _user,
            timestamp : block.timestamp,
            likes : 0
        });
        tweets[msg.sender].push(newtweet);

        emit tweetcreated(newtweet.id, newtweet.admin, newtweet.content, newtweet.timestamp, newtweet.likes);
    }

    function liketweet(address author,uint256 id) external {
     require(tweets[author][id].id==id,"Tweet does not exist");
     tweets[author][id].likes++;
     emit event_like(msg.sender,author,id,tweets[author][id].likes);
    }

    function unliketweet(address author,uint256 id)external {
        require(tweets[author][id].likes<1,"");
       require(tweets[author][id].id==id,"Tweet does not exist");
       tweets[author][id].likes--;
    }

    function totaltweet(address _author)public view returns(uint256){
            uint256 tot_likes;
            for(uint256 i=0;i < tweets[_author].length;i++){
                if(tweets[_author][i].admin==_author){
                    tot_likes += tweets[_author][i].likes;
                }
            }

            return tot_likes;
    }
     function gettweet(address _admin,uint _i)public view returns(Ntweet memory){
        return tweets[_admin][_i];
     }
     function getfulltweet(address _admin) public view returns(Ntweet[] memory){
         return tweets[_admin];
     }

}
