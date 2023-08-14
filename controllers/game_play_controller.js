import { v4 as uuidv4 } from 'uuid';
import ChallengeModel from "../models/challenge_model.js"


const GameWinStatus = {
    na: 'na',
    win: 'win',
    draw: 'draw'
  };
  

class GamePlayController {

    static getGameRoom = async(req, res) =>{
    console.log(req.body)

   try {
    const {userId} = req.body
    var resData = {};
    const randomRoom = await GamePlayController.getRandomChallengeRoom(userId)
    console.log(req.body)

    // random
    if(randomRoom != 0){
      resData = {"room": randomRoom}    
    }
    else{
     // creating

     var challengeRoom =  await GamePlayController.challengeCreate(userId)
     resData = {"room": challengeRoom}
    }
    res.status(200).send(resData)
    
   } catch (error) {

    res.status(202).send(resData)
    
   }

  }
    
  
      static joinGame = async (roomId, joinUserId)=> {
        
        const getGameDetail  = await ChallengeModel.find({roomId:roomId})

        if(getGameDetail[0].joinedUserA === joinUserId){
          // joinedUserB:getGameDetail[0].joinedUserB
          return {isRoomFull:false,   joinedUserA:getGameDetail[0].joinedUserA }
        }
        else{
          const availableChallenge = await 
          ChallengeModel.findOneAndUpdate({roomId: roomId}, {joinedUserB:joinUserId}, {returnDocument:"after"});

          console.log(availableChallenge)

         

          return {isRoomFull:true, joinedUserA:availableChallenge.joinedUserA, joinedUserB:availableChallenge.joinedUserB}

        }
      }


      static gameOver= async (roomId, userId, winStatus) =>{

        if(winStatus == GameWinStatus.win){
            const availableChallenge = await 
            ChallengeModel.findOneAndUpdate({roomId: roomId}, {winStatus:{winUId:userId,status:GameWinStatus.win }});

        }

        if(winStatus == GameWinStatus.draw){
            const availableChallenge = await 
            ChallengeModel.findOneAndUpdate({roomId: roomId}, {winStatus:{status:GameWinStatus.draw }});

        }

      }


      static getRandomChallengeRoom = async (userId)=>{
       try {

        const oneMinuteAgo = new Date(Date.now() - 60000);
        const availableChallenge = await 
        ChallengeModel.find({
          $and: [
            {
              $or: [
                { joinedUserA: "" },
                { joinedUserB: "" }
              ]
            },
            { createdDate: { $gte: oneMinuteAgo } } 
          ]})
  
        if(availableChallenge.length != 0){
          // available challenge
          const randomNumber = Math.floor(Math.random() * availableChallenge.length)
        return  availableChallenge[randomNumber].roomId
      }else{
        return 0
      }
       } catch (error) {

        return 0
        
       }
    }


      static challengeCreate = async(userId)=> {
         // createing  challenge
         const roomId = uuidv4()
         const challengeData = new ChallengeModel({
          roomId: roomId,
          joinedUserA: userId
      });
      
        try {
          
         await challengeData.save()
  
         return roomId
          
        } catch (error) {

          console.log(error)
          
          return 0
        }}
      
    
}


export default GamePlayController