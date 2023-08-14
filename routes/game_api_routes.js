import express from "express"
import GamePlayController from "../controllers/game_play_controller.js"


const router = express.Router()
router.post('/get_game_room', GamePlayController.getGameRoom)


export default router