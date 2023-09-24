import React from 'react'
import Languages from './Languages'
import Interest from './Interest'
import Achivements from './Achivements'
import Referances from './Referances'

const Others = ({setActiveTab,id}) => {
  return (
    <div>
      <Languages/>
      <Interest/>
      {/* <Achivements/> */}
      <Referances/>
    </div>
  )
}

export default Others