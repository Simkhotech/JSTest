export default function toDownloadJSON(data, anchorElemParrent) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

    anchorElemParrent.innerHTML = `<a style={{display: 'none'}}>Get JSON</a>`;
    const dlAnchorElem = anchorElemParrent.getElementsByTagName("a")[0];

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "data.json");
    dlAnchorElem.click();
}