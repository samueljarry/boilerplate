import { useEffect, useRef } from "react"
import { ViewsManager } from "@core/managers/ViewsManager";

export const ReactView = ({ children, viewId, className = '' }) => {
  const ref = useRef();
  
  useEffect(() => {
    const view = ViewsManager.GetView(viewId);
    view.setHtmlElement(ref.current);
  }, [])
  
  return (
    <div id={viewId} className={`view ${className}`} ref={ref}>
      {children}
    </div>
  )
}