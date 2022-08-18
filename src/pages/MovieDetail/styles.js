import { alpha } from '@mui/material/styles'

const styles = {
    backdrop: {
        zIndex: -1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: (theme) => theme.navBar.height,
        height: '674px',
        backgroundSize: 'cover',
        '&::before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundImage: (theme) =>
                `linear-gradient(${alpha(theme.color.primary.main, 0.85)}, ${
                    theme.color.primary.main
                })`
        }
    },
    movieIntro: {
        display: {
            xs: 'block',
            md: 'flex'
        },
        px: '16px',
        maxWidth: '900px',
        justifyContent: 'center',
        m: {
            xs: 'auto',
            xl: 0
        },
        pt: {
            xs: '40px',
            md: '60px',
            xl: '100px'
        }
    },
    thumbnailContainer: {
        flex: '0 0 33.333%',
        width: {
            xs: '240px',
            md: 'auto'
        },
        height: {
            xs: '350px',
            md: 'auto'
        },
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    },
    main: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        width: {
            sm: 'fit-content',
            lg: 'auto'
        },
        flex: {
            md: '0 0 66.667%'
        },
        paddingLeft: {
            md: '60px',
            lg: '80px'
        },
        margin: {
            xs: '24px auto'
        }
    },
    title: {
        color: '#fff',
        display: 'block',
        maxWidth: {
            xs: '360px',
            lg: '460px'
        },
        fontSize: {
            xs: '50px',
            xl: '65px'
        },
        fontWeight: '400',
        lineHeight: '1.2',
        textAlign: {
            xs: 'center',
            md: 'left'
        },
        marginLeft: {
            xs: 'auto',
            md: 0
        },
        marginRight: {
            xs: 'auto',
            md: 0
        }
    },
    info: {
        display: 'flex',
        flexFlow: 'row wrap',
        mt: 2.5,
        maxWidth: '400px',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: {
            xs: 'auto',
            md: 0
        },
        marginRight: {
            xs: 'auto',
            md: 0
        }
    },
    rating: {
        '.MuiRating-decimal + .MuiRating-decimal': {
            ml: '3px'
        },
        '& svg': {
            fontSize: {
                xs: '18px',
                md: '21px'
            }
        },
        '& .MuiRating-icon': {
            color: '#efce4a'
        },
        '& .MuiRating-iconEmpty': {
            color: '#848d93'
        }
    },
    genre: {
        marginLeft: 1.5,
        mx: 2,
        '& .MuiTypography-root': {
            fontSize: '15px',
            ml: 1
        }
    },
    releaseDay: {
        display: 'flex',
        '& svg': {
            color: (theme) => theme.color.heading
        },
        '& .MuiTypography-root': {
            color: '#fff',
            ml: 0.5,
            fontSize: '15px'
        }
    },
    control: {
        marginTop: {
            xs: '26px',
            md: '18px'
        },
        width: 'fit-content',
        marginLeft: {
            xs: 'auto',
            md: 0
        },
        marginRight: {
            xs: 'auto',
            md: 0
        }
    },
    pageContent: {
        marginTop: '20px',
        padding: '10px 16px',
        width: {
            xs: '100%',
            md: '75%'
        },
        mx: 'auto'
    },
    progress: {
        backgroundColor: '#505e68',
        '& span': {
            backgroundColor: (theme) => theme.color.nav
        }
    }
}

export default styles
