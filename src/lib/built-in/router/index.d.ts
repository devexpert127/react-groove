import { Location } from 'history'
import { NextRouter } from 'next/router'

export declare function useRouter(): {
  location: Partial<Location>
  pathname: NextRouter['pathname']
  query: NextRouter['query']
  push: NextRouter['push']
  replace: NextRouter['replace']
  reload: NextRouter['reload']
  back: NextRouter['back']
  events: NextRouter['events']
}