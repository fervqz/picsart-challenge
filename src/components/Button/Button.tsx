import React from 'react';

const Button: React.FC<React.PropsWithChildren> = ({ children }: Readonly<React.PropsWithChildren>) => {
    return (
        <div style={style.button}>{children}</div>
    )
}

export default Button;

const style = {
    button: {
        backgroundColor: 'var(--picsart-accent)',
        borderRadius: '2rem',
        padding: '0.5rem 1rem',
        color: 'white',
        fontSize: '0.8rem',
    }
}