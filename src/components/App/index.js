import React from 'react'
import { useRouter } from 'frontend-router'
import { useLoadFBPixel } from 'Components/LoadFBPixel'
import { useLoadGladlySidekick } from 'Components/LoadGladlySidekick'
import { useLoadGtm } from 'Components/LoadGtm'
import { useLoadJustuno } from 'Components/LoadJustuno'
import { useLoadKlaviyo } from 'Components/LoadKlaviyo'
import { useLoadPinterest } from 'Components/LoadPinterest'
import { useLoadAttentive } from 'Components/LoadAttentive'
import { useLoadOrderLookup } from 'Components/LoadOrderLookup'
import { useLoadOkendo } from 'Components/LoadOkendo'

const App = ({ children }) => {
  const router = useRouter()
  const routerLocation = router.location

  useLoadFBPixel()
  useLoadGladlySidekick()
  useLoadGtm()
  useLoadJustuno(routerLocation)
  useLoadKlaviyo()
  useLoadPinterest()
  useLoadAttentive()
  useLoadOrderLookup(routerLocation)
  useLoadOkendo()

  return <React.Fragment>{children}</React.Fragment>
}

export default App
