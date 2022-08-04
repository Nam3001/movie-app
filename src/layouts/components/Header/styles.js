
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
        width: '100%',
        height: theme => theme.navBar.height,
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
        fontSize: '15.4px',
        cursor: 'pointer',
        height: '42px',
        lineHeight: '42px',
        mx: '8px',
        userSelect: 'none',
        textDecoration: 'none',

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