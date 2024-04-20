import React from 'react';
import DummyHeader from './DummyHeader';
import DummyNavbar from './DummyNavbar';
import DummyLayersBar from './DummyLayersBar';

interface Props {
    children: React.ReactNode;
}

const DummyLayout: React.FC<Props> = ({ children }: Props) => {
    return (
        <main style={style.main}>
            <DummyHeader />
            <div style={style.content}>

                <DummyNavbar />

                <div style={{ flexGrow: 1 }} >
                    {children}
                </div>

                <DummyLayersBar />

            </div>
        </main >
    )
}

export default DummyLayout;

const style = {
    main: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        backgroundColor: 'var(--bg-border)',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        gap: '1px',
        backgroundColor: 'var(--bg-border)',
        height: 'calc(100% - 50px)',
    }
};