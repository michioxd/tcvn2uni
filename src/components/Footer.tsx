import { Box, Link, Typography } from "@mui/material";

import Style from './Footer.module.scss';
import nekochoko from './../assets/nekochoco.png';

export default function Footer() {
    return (
        <>
            <Box className={Style.Footer}>
                <img srcSet={nekochoko} className={Style.FooterLogo} alt="nekochoko" />
                <div className={Style.Ydivider} />
                <Typography className={Style.by} variant="body2">
                    made with &hearts; by <Link href="//github.com/michioxd" target="_blank">michioxd</Link> from <Link href="//github.com/nekochoko" target="_blank">nekochoko</Link>
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography className={Style.by} variant="body2">
                    <Link href="https://github.com/michioxd/tcvn2uni" target="_blank">Fork me on GitHub</Link>
                </Typography>
            </Box>
        </>
    )
}