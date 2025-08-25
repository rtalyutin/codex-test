import { FC, useState } from 'react'
import Discard from '../components/Discard'
import HUD from '../components/HUD'
import Hand from '../components/Hand'
import LogView from '../components/LogView'
import SpeciesBoard from '../components/SpeciesBoard'
import WateringHole from '../components/WateringHole'
import SwitchPlayerScreen from './SwitchPlayerScreen'

const GameScreen: FC = () => {
  const [activePlayer, setActivePlayer] = useState(0)
  const [switching, setSwitching] = useState(false)

  const handleSwitch = () => setSwitching(true)
  const handleReady = () => {
    setActivePlayer((p) => (p + 1) % 2)
    setSwitching(false)
  }

  return (
    <div className="game-screen" style={{ position: 'relative' }}>
      <div className="table">
        <WateringHole />
        <SpeciesBoard />
        <Discard />
        <LogView />
      </div>
      <div className="active-player-panel">
        <HUD onSwitchPlayer={handleSwitch} />
        <Hand active={!switching} player={activePlayer} />
      </div>
      {switching && <SwitchPlayerScreen onReady={handleReady} />}
    </div>
  )
}

export default GameScreen
