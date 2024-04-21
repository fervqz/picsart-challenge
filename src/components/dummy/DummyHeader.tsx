import React from 'react'
import PicsartLogoSVG from '../svgs/PicsartLogoSVG/PicsartLogoSVG';
import Button from '../Button/Button';
import DownloadSVG from '../svgs/DownloadSVG/DownloadSVG';

const DummyHeader = () => {
    return (
        <nav style={style.navbar}>
            <div style={style.logo}>
                <PicsartLogoSVG />
            </div>
            <p style={style.title}>Picsart Challenge</p>
            <div>
                <Button>
                    <div style={style.export}>
                        <DownloadSVG color='white' />&nbsp;Export
                    </div>
                </Button>
            </div>
        </nav>
    )
}

export default DummyHeader;

const style = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
        backgroundColor: 'var(--card-bg-color)',
    },
    logo: {
        paddingInline: '4px',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.9rem',
        fontWeight: '300',
    },
    export: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
};