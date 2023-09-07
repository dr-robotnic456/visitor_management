import Auth from '@/components/Auth'
import VisitorsLog from '@/components/VisitorsLog'
import React from 'react'

function VisitorsLogBook() {
  return (
    <div>
      <VisitorsLog />
    </div>
  )
}

export default Auth(VisitorsLogBook)
