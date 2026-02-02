const itemInput = document.querySelector("#item-input");
const addButton = document.querySelector("#add-button");
const shoppingList = document.querySelector("#shopping-list");

const getListLocalStorage = () => {
  const inköpsList = localStorage.getItem("inköps_list");
  return inköpsList ? JSON.parse(inköpsList) : [];
};

function renderList() {
  const lists = getListLocalStorage();
  shoppingList.innerHTML = "";

  if (lists.length !== 0) {
    const removeAll = document.createElement("button");
    removeAll.textContent = "Remove All";

    removeAll.classList.add("removteALl");

    removeAll.addEventListener("click", () => {
      const confirmed = confirm("Are you sure you want to remove all lists?");

      if (confirmed) {
        localStorage.removeItem("inköps_list");
        renderList();
      } else {
        return;
      }
    });

    shoppingList.appendChild(removeAll);
  }

  if (lists.length == 0) {
    const h4 = document.createElement("h4");
    h4.textContent = "Don't Have Any List Yet";
    shoppingList.appendChild(h4);
    return;
  }
  lists.forEach((item, index) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const delBtn = document.createElement("button");
    p.textContent = item;
    delBtn.textContent = "Delete";
    delBtn.dataset.index = index;
    delBtn.classList.add("delBtn");
    li.appendChild(p);
    li.appendChild(delBtn);
    shoppingList.appendChild(li);

    delBtn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const lists = getListLocalStorage();
      lists.splice(index, 1);

      localStorage.setItem("inköps_list", JSON.stringify(lists));

      renderList();
    });
  });
}

function addList() {
  let value = itemInput.value.trim();
  if (!value) {
    return alert("lägg till inköplist");
  }

  const list = getListLocalStorage();

  const alreadyListed = list.find((item) => item === value);
  if (alreadyListed) {
    const h4 = document.createElement("h4");
    h4.textContent = "Already You added list";

    h4.classList.add("alredy_warring");

    shoppingList.appendChild(h4);
    return;
  }
  list.push(value);
  localStorage.setItem("inköps_list", JSON.stringify(list));

  itemInput.value = "";
  renderList();
}

addButton.addEventListener("click", addList);

renderList();
