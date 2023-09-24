import React from 'react'
import Languages from './Languages'
import Interest from './Interest'
import Achivements from './Achivements'
import Referances from './Referances'
import { useGlobalAppContext } from '@/context/context'

const Others = ({id}) => {
  const { fetchResumedata, currentData,updateResumeRecord,activeTab, setActiveTab } = useGlobalAppContext();
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