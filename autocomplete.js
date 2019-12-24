const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {

    root.innerHTML = `
        <lable><b>Search for a movie</b></lable>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;
    const searchInput = root.querySelector("input");
    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".dropdown-content");

    let timeoutId;
    const onInput = async (event) => {
        const items = await fetchData(event.target.value);
        if(!items.length){
            dropdown.classList.remove("is-active");
            return;
        };
        resultsWrapper.innerHTML = "";
        dropdown.classList.add("is-active");
        for (let item of items){
            const option = document.createElement("a");
            
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener("click", () => {
                dropdown.classList.remove("is-active");
                searchInput.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);


        }
    };
    searchInput.addEventListener('input', debounce(onInput, 500));

    document.addEventListener("click", evnet => {
        if (!root.contains(event.target)){
            dropdown.classList.remove("is-active");
        }
    });
};