function UserListAction(url, renderViewFields) {
    this.baseUrl = url;
    this.renderViewFields = renderViewFields;
}

UserListAction.prototype.getAllUsers = async function () {
    try {
        const allUsers = await fetch(this.baseUrl);
        if (allUsers.ok) {
            return allUsers.json();
        }
        return [];
    } catch (err) {
        console.log(err);
    }
};

UserListAction.prototype.renderAllUsers = function (userList) {
    userList.forEach(user => {
        deepRender(user, this.renderViewFields);
    });
}


function deepRender(objectRender, renderView) {
    Object.keys(objectRender).forEach((key, index) => {

        if (objectRender[key] instanceof Object) {

            const deepRenderView = filterAddressAttributes(renderView, key);

            if (Array.isArray(deepRenderView) && deepRenderView.length > 0) {
                deepRender(objectRender[key], deepRenderView);
            }

        } else {
            if (renderView.includes(key)) {
                console.log(`${key} = ${Object.values(objectRender)[index]}`);
            }
        }

    })
}

function filterAddressAttributes(attributeList, key) {
    return attributeList
        .filter(attribute => attribute.startsWith(`${key}.`))
        .map(filteredAttribute => filteredAttribute.replace(`${key}.`, ''));
}

const renderViewFields = ['id', 'name', 'email', 'address.city'];
const userListAction = new UserListAction("https://jsonplaceholder.typicode.com/users", renderViewFields);
const usersList = userListAction.getAllUsers();
usersList.then(users => userListAction.renderAllUsers(users));

