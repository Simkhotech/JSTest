const config = {
    dbServer: 'http://localhost:3001',
    reducerActions: {
        editRow: 'EDIT_ROW',
        saveRow: 'SAVE_ROW',
        deleteRow: 'DELETE_ROW',
        addRow: 'ADD_ROW',
        sortRows: 'SORT_ROWS',

        gotFromDB: 'GOT_FROM_DB',
        saveToDB: 'SAVE_TO_DB'
    },
    jsonName: 'data.json'
};

export default config;
