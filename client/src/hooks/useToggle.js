import {useState} from 'react'

export const useToggle = () => {
    const [el, setEl] = useState(null)
    const open =Boolean(el);

    const onClick=(e)=>{
        setEl(e.currentTarget)
        }
    const onClose=()=>{
        setEl(null)
    }
  return {
    el,
    open,
    onClick,
    onClose
  }
}
