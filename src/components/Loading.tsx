import React from 'react'

const Component: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      textAlign: 'center',
      fontSize: '30px',
      color: '#FFF',
      backgroundColor: '#000',
      zIndex: '10',
    }}>
      <div style={{ paddingTop: 150 }}>加载中...</div>
    </div>
  )
}

export default Component
