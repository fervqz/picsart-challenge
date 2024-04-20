import React from 'react'

const DummyHeader = () => {
    return (
        <nav style={style.navbar}>
            <div style={style.logo}></div>
            <p style={style.title}>Picsart Challenge</p>
            <div style={style.export}></div>
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
        backgroundColor: 'var(--placeholder-bg-color)',
        borderRadius: 'var(--border-radius)',
        width: '7rem',
        height: '3rem',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    export: {
        backgroundColor: 'var(--placeholder-bg-color)',
        borderRadius: 'var(--border-radius)',
        width: '7rem',
        height: '3rem',
    }
};