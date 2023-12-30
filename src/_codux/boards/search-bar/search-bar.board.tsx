import React from 'react';
import { createBoard } from '@wixc3/react-board';
import SearchBar from '../../../SearchBar';

export default createBoard({
    name: 'SearchBar',
    Board: () => <SearchBar />,
    isSnippet: true,
});
