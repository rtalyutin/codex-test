import type { FC } from 'react'
import Discard from '../components/Discard'
import HUD from '../components/HUD'
import Hand from '../components/Hand'
import LogView from '../components/LogView'
import SpeciesBoard from '../components/SpeciesBoard'
import WateringHole from '../components/WateringHole'

const GameScreen: FC = () => {
  return (
    <div className="game-screen">
      <div className="table">
        <WateringHole />
        <SpeciesBoard />
        <Discard />
        <LogView />
      </div>
      <div className="active-player-panel">
        <HUD />
        <Hand />
      </div>
    </div>
  )
}

export default GameScreen
