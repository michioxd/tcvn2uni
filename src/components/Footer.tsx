import { Box, Link, Typography } from "@mui/material";

import Style from './Footer.module.scss';
import logo from "./../assets/logo.svg";

export default function Footer() {
    return (
        <>
            <Box className={Style.Footer}>
                <img srcSet={logo} className={Style.FooterLogo} alt="michioxd" />
                <Typography className={Style.by} variant="body2">
                    made with &hearts; by <Link href="//github.com/michioxd" target="_blank">michioxd</Link>
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography className={Style.by} variant="body2">
                    <Link href="https://github.com/michioxd/tcvn2uni" target="_blank">Dự án trên GitHub</Link>
                </Typography>
            </Box>
        </>
    )
}