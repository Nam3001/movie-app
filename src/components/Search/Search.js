import { useState, useCallback, memo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Box, Typography, MenuItem } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

import SearchMobile from './SearchMobile'
import SearchPC from './SearchPC'
import movieApi from '@/utils/api/movieApi'
import useDebounce from '@/hooks/useDebounce'
import config from '@/configs'
import { createPathname } from '@/utils/common'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const SearchSuggest = styled('div')(
    ({ theme, bgcolor, color, font_size, width, max_height, mobile, pc }) => ({
        width: width || '100%',
        maxHeight: max_height || '420px',
        scrollSnapType: 'y mandatory',
        overflow: 'auto',
        position: 'absolute',
        zIndex: '1',
        left: '0',
        marginTop: '10px',
        borderRadius: '3px',
        backgroundColor: bgcolor || '#fff',
        color: color || '#333',
        fontSize: font_size || '16px',
        [theme.breakpoints.down('lg')]: {
            display: mobile ? 'block' : 'none'
        },
        [theme.breakpoints.up('lg')]: {
            display: pc ? 'block' : 'none'
        },
        '& span': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        '& li': {
            scrollSnapAlign: 'start',
        }
    })
)

const Search = ({ placeholder }) => {
    return (
        <Box>
            <SearchMobile
                placeholder={placeholder}
                SuggestComponent={SearchSuggest}
            />
            <SearchPC
                placeholder={placeholder}
                SuggestComponent={SearchSuggest}
            />
        </Box>
    )
}

Search.propTypes = {
    placeholder: PropTypes.string
}

export default memo(Search)
