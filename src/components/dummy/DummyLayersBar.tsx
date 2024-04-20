import React from 'react'

const DummyLayersBar = () => {
    return (
        <div style={style.container}>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={style.layer}></div>
            ))}
        </div>
    )
}

export default DummyLayersBar;

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '12rem',
        height: '100%',
        padding: '0.5rem',
        backgroundColor: 'var(--card-bg-color)',
    },
    layer: {
        width: '100%',
        height: '4rem',
        backgroundColor: 'var(--placeholder-bg-color)',
        borderRadius: 'var(--border-radius)',
    },
};