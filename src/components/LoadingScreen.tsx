import React from 'react'
import '../styles/loadingscreen.css'

interface LoadingScreenProps {
  loading: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
  return loading ? (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  ) : null
}

export default LoadingScreen;