import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import { TIPISProperties } from "./interface"

interface IInject {
  track: (event: string, properties: Omit<TIPISProperties, "page">) => void
}

export const TipisTrackContext = createContext<IInject>({} as IInject)

interface TipisTrackProviderProps {
  basicTrack: (event: string, properties: Omit<TIPISProperties, "page">) => void
  children: ReactNode
}

export const TipisTrackProvider: FC<TipisTrackProviderProps> = (props) => {
  const { children, basicTrack } = props

  const track = useCallback(
    (event: string, properties: Omit<TIPISProperties, "page">) => {
      basicTrack(event, properties)
    },
    [basicTrack],
  )

  const injectValue = useMemo(() => {
    return {
      track,
    }
  }, [track])

  return (
    <TipisTrackContext.Provider value={injectValue}>
      {children}
    </TipisTrackContext.Provider>
  )
}

TipisTrackProvider.displayName = "TipisTrackProvider"
