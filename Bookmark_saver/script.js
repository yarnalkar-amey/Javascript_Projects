const bname = document.querySelector("#bookmark-name");
const url = document.querySelector("#url");
const addbtn = document.querySelector("#add-mark-btn");

const alldata = [];

function renderMarks() {
    const listContainer = document.querySelector("#bookmark-list-container");
    listContainer.innerHTML = "";

    alldata.forEach((item, index) => {
        const { name, burl } = item;

        const element = document.createElement("div");
        element.className = "bookmark";
        element.id = `bookmark${index}`;

        element.innerHTML = `
            <a href="${burl}" target="_blank">${name}</a>
            <button class="btn-remove">Remove</button>
        `;

        // Remove button logic
        element.querySelector(".btn-remove").addEventListener("click", () => {
            alldata.splice(index, 1);
            renderMarks();
        });

        listContainer.appendChild(element);
    });
}

addbtn.addEventListener("click", function () {
    const name = bname.value.trim();
    const burl = url.value.trim();

    if (!name || !burl) {
        alert("Please enter both name and URL.");
        return;
    }

    alldata.push({ name, burl });

    renderMarks();
    bname.value = "";
    url.value = "";
});
