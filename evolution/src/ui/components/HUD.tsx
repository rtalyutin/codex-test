import { FC, useEffect, useState } from 'react'

interface HUDProps {
  onSwitchPlayer: () => void
}

const HUD: FC<HUDProps> = ({ onSwitchPlayer }) => {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div>TTFT: {elapsed}s</div>
      <button onClick={onSwitchPlayer}>Сменить игрока</button>
    </div>
  )
}

export default HUD
