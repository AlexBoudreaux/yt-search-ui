import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'SB',
    Board: () => <div>
        <input inputMode="tel" />
    </div>,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 265,
        canvasBackgroundColor: '#bebebe',
        canvasHeight: 118
    }
});
