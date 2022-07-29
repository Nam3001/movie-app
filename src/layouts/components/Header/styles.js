
const styles = {
    logo: {
        width: 163,
        cursor: 'pointer'
    },
    appBar: {
        backgroundColor: (theme) => theme.color.primary.light,
        boxShadow: 0,
        alignItems: 'center',
    },
    toolbar: {
        height: '64px',
        justifyContent: 'space-between',
        px: '16px !important'
    },
    menu: {
        color: (theme) => theme.color.nav,
        fontSize: '24px',
        width: 'auto',
        cursor: 'pointer',
        paddingRight: '10px',
        marginTop: '4px'
    },
    navItem: {
        color: (theme) => theme.color.nav,
        fontWeight: '500',
        fontSize: '15px',
        cursor: 'pointer',
        ml: 2,
        height: '38px',
        lineHeight: '38px',
        userSelect: 'none',

        '&:hover': {
            color: '#fff'
        }
    },
    search: {
        height: '32px',
        borderRadius: 1,
        p: 1,
        ml: 2,
        backgroundColor: '#fff'
    }
}

export default styles