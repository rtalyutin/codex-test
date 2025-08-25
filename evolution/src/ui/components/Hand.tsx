import type { FC } from 'react'

interface HandProps {
  active: boolean
  player: number
}

const Hand: FC<HandProps> = ({ active, player }) => {
  return (
    <div>
      {active
        ? `Hand игрока ${player + 1}`
        : `Карты игрока ${player + 1} скрыты`}
    </div>
  )
}

export default Hand
