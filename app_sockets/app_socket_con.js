import { v4 as uuidv4 } from 'uuid' 
import GamePlayController from '../controllers/game_play_controller.js';

// Store connected users and their corresponding rooms
const connectedUsers = new Map();

const  appSocket = (io) =>{
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');

      // Remove user from connected users
      if (connectedUsers.has(socket.id)) {
        const room = connectedUsers.get(socket.id);
        connectedUsers.delete(socket.id);
        io.to(room).emit('user left', socket.id);
      }
    });


  
    socket.on('join_game', async(data)  => {
  
      try {
        const {roomId, userId} = data
      socket.join(roomId);
      connectedUsers.set(socket.id, roomId);
     const joinData = await GamePlayController.joinGame(roomId, userId)
   
      io.to(roomId).emit('join_game', {roomId,userId, isRoomFull: joinData.isRoomFull, joinedUserA: joinData.joinedUserA, joinedUserB:joinData.joinedUserB});
      } catch (error) {
        console.log(error)
        
      }
      
    });

    socket.on('on_player_turn', (data) => {
     
      const { room, myId, yourId, tapBoxIndex, xo 
      } = data;
      io.to(room).emit('on_player_turn', data);
    });

    socket.on('exit_game', (data) => {
      console.log("On Exit")
      console.log(data)
    try {
      const { room, xo  } = data;
      io.to(room).emit('exit_game', data);
      
    } catch (error) {
      console.log(error)
      
    }
    });

    
  });
}

export default appSocket;