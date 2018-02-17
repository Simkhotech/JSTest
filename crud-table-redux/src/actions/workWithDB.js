import config from '../config';

export const getRowsFromDB = () => dispatch => {
    {
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open('GET', config.dbServer, true);

        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                alert('Updated!');
                dispatch({type: config.reducerActions.gotFromDB, payload: JSON.parse(xmlHttp.responseText)});
            }
        };

        xmlHttp.send(null);
    }
};

export const saveRowsToDB = (rows) => dispatch => {
    {
        let first = true;
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.open("POST", config.dbServer, true);

        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");

        xmlHttp.onreadystatechange = () => {
            if (first && xmlHttp.readyState === XMLHttpRequest.DONE) {
                alert(
                    (xmlHttp.status === 200) ?
                        `Saved!` : `Not Saved! (${xmlHttp.status})`
                );
                first = false;

                dispatch({type: config.reducerActions.saveToDB});
            }

        };

        xmlHttp.send(JSON.stringify(rows));
    }
};