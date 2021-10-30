const { H, R, } = (window as any);

const App = (_: any,) => {
    
    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-right' },
            H('h1', 'hi')
        )
    );
};

R(H(App), document.getElementById('app'));
