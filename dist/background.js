chrome.action.onClicked.addListener((tab) => {
    console.log("Here!");
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["row.css"],
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: makeTablesRollable,
    });
});
function makeTablesRollable() {
    console.log("Hi from Tab!");
    const tables = document.body.querySelectorAll("table");
    console.log(tables);
    tables.forEach((tableEl) => {
        const parent = tableEl.parentElement;
        const rollButton = document.createElement("button");
        const rows = tableEl.querySelectorAll("tr >td:last-child");
        rollButton.textContent = `Roll d${rows.length}`;
        rollButton.addEventListener("click", () => {
            const dieRoll = Math.floor(Math.random() * (rows.length - 1));
            const selectedRow = rows === null || rows === void 0 ? void 0 : rows[dieRoll];
            const rolledValue = selectedRow.parentElement.querySelector("td:first-child").textContent;
            rows.forEach((row) => {
                row.parentElement.style.backgroundColor = "inherit";
            });
            selectedRow.parentElement.style.backgroundColor = "#fbf9d4";
            rollButton.textContent = `Rolled ${rolledValue}: ${selectedRow.textContent}`;
        });
        parent.prepend(rollButton);
    });
}
