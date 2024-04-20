import React from 'react'

const DummyNavbar = () => {
    return (
        <div style={style.container}>

            <div style={style.navbar}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={style.tool}></div>
                ))}
            </div>

            <div style={style.toolElements}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} style={style.tool}></div>
                ))}
            </div>

        </div>
    )
}

export default DummyNavbar;

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: '1px',
        backgroundColor: 'var(--bg-border)',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '5.5rem',
        padding: '1rem',
        backgroundColor: 'var(--card-bg-color)',
    },
    tool: {
        width: '100%',
        aspectRatio: '1/1',
        backgroundColor: 'var(--placeholder-bg-color)',
        borderRadius: 'var(--border-radius)',
    },
    toolElements: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        width: '21rem',
        height: '100%',
        backgroundColor: 'var(--card-bg-color)',
    },
};