const styles = {
    reviewList: {
        mt: 4,
        maxHeight: '800px',
        overflow: 'auto'
    },
    review: {
        flex: {
            xs: '0 0 100%',
            sm: '0 0 50%'
        },
        display: 'flex',
        mt: 4
    },
    avatar: {
        flex: '0 0 70px',
        overflow: 'hidden',
        visibility: 'hidden',
        '& img': {
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            objectFit: 'cover'
        }
    },
    text: {
        mr: 4,
        ml: 2,
        hyphens: 'auto',
        minWidth: '0',
        flex: 1,
        color: (theme) => theme.color.nav
    },
    name: {
        fontSize: '20px',
        color: (theme) => theme.color.heading
    },
    emptyReview: {
        mt: '24px',
        fontSize: '18px',
        color: '#fff',
        maxHeight: '360px',
        overflow: 'auto',
        paddingRight: '10px',
        width: '100%',
        textAlign: 'center'
    },
    selectContainer: {
        mt: '20px',
        '&::after': {
            content: '""',
            display: 'block',
            clear: 'both'
        },
        '& .select': {
            float: 'right',
            width: '200px'
        },
        '& .label': {
            float: 'right',
            py: '10px',
            marginRight: '12px',
            color: '#fff'
        }
    },
    fromNow: {
        textAlign: 'right',
        color: (theme) => theme.color.nav,
        fontStyle: 'italic',
        fontWeight: '300'
    }
}

export default styles
