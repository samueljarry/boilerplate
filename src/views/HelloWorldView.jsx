import { ReactView } from "@core/bases/views/react/ReactView"

export const HelloWorldView = ({...props}) => {
  return (  
    <ReactView {...props}>
      <p>Hello World 🌍</p>
    </ReactView>
  )
}