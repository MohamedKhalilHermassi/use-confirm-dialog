import { useContext } from 'react'
import { ConfirmContext } from './ConfirmProvider'

export const useConfirm = () => useContext(ConfirmContext)
