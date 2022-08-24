import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Dialog, DialogActions, Button } from '@mui/material'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DEFAULT_FUNC } from '@/utils/constants/common'

const styles = {
    container: {
        '& .MuiPaper-root': {
            margin: '18px',
            mt: '40px'
        }
    },
    btn: {
        textTransform: 'none'
    }
}

function DialogAlert({ open, title, content, onAllow, onClose }) {
    return (
        <div>
            <Dialog sx={styles.container} open={open} onClose={onClose}>
                <DialogTitle>
                    {title}
                    {onClose ? (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 5,
                                top: 5,
                                color: (theme) => theme.palette.grey[500]
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={styles.btn}
                        color="primary"
                        variant="outlined"
                        onClick={onClose}
                    >
                        Bỏ qua
                    </Button>
                    <Button
                        sx={styles.btn}
                        color="primary"
                        variant="contained"
                        onClick={onAllow}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

DialogAlert.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onClose: PropTypes.func,
    onAllow: PropTypes.func
}

export default DialogAlert
