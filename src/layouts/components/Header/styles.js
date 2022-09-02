const styles = {
    logo: {
        width: 110,
        cursor: 'pointer'
    },
    appBar: {
        backgroundColor: (theme) => theme.color.primary.light,
        boxShadow: 0,
        alignItems: 'center'
    },
    toolbar: {
        width: '100%',
        height: (theme) => theme.navBar.height,
        justifyContent: 'space-between',
        px: '16px !important',
        position: 'relative'
    },
    menu: {
        color: (theme) => theme.color.nav,
        fontSize: '24px',
        width: 'auto',
        cursor: 'pointer',
        paddingRight: '10px',
        marginTop: '4px'
    },
    navList: {
        display: {
            xs: 'none',
            md: 'flex'
        },
        alignItems: 'center',
        height: '100%',
        marginRight: {
            lg: 2
        }
    },
    navItem: {
        height: 'calc(100% - 4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.active': {
            boxShadow: (theme) => `0 2px ${theme.color.heading}`
        }
    },
    navLink: {
        display: 'block',
        color: (theme) => theme.color.nav,
        fontWeight: '500',
        fontSize: '15.4px',
        cursor: 'pointer',
        height: '48px',
        lineHeight: '48px',
        mx: '8px',
        userSelect: 'none',
        textDecoration: 'none',

        '&:hover': {
            color: '#fff'
        },

        '&.active': {
            color: '#fff'
        }
    },
    navItemFooter: {
        position: 'absolute',
        height: '2px',
        backgroundColor: (theme) => theme.color.heading,
        left: 0,
        bottom: 0,
        display: {
            xs: 'none',
            md: 'block'
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
