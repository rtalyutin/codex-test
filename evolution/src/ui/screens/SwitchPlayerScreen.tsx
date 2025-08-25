import type { FC } from 'react'

interface SwitchPlayerScreenProps {
  onReady: () => void
}

const SwitchPlayerScreen: FC<SwitchPlayerScreenProps> = ({ onReady }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'rgba(0, 0, 0, 0.8)',
        }}
      />
      <p>Смена игрока</p>
      <button onClick={onReady}>Продолжить</button>
    </div>
  )
}

export default SwitchPlayerScreen
