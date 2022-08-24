import { useCallback } from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSnackbar } from 'notistack'

// This hook used custom hook useSnackbar from notistack library
const useToastMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const action = (snackbarId) => (
        <IconButton
            sx={{ color: '#fff' }}
            onClick={() => {
                closeSnackbar(snackbarId)
            }}
        >
            <CloseIcon />
        </IconButton>
    )

    return useCallback((message, options) => {
        enqueueSnackbar(message, {
            variant: 'default',
            action,
            ...options
        })
    }, [])
}
export default useToastMessage
