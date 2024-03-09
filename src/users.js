class UsersListAction {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getAllUsers() {
        try {
            const response = await fetch(this.baseUrl);

            if (response.ok) {
                return response.json();
            }

            console.log("Fail get all users; Error status -", response.status);
        } catch (err) {
            console.log("Error get all users; Error -", err);
        }
        return [];
    }

    async getUserById(userId) {
        try {
            const response = await fetch(`${this.baseUrl}/${userId}`);

            if (response.ok) {
                return response.json();
            }

            console.log("Fail get user by id; Error status -", response.status);
        } catch (err) {
            console.log("Error get user by id; Error -", err);
        }
        return [];
    }

    renderUsers(usesList) {
        if (!Array.isArray(usesList)) {
            return;
        }
        const listElement = document.querySelector('.users-list');
        const urlSearchParams = new URLSearchParams({w: 120, h: 120});

        usesList.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = getUserHeadDetailsInnerHTML(user, urlSearchParams, 'company.name', 'Company');

            listItem.addEventListener('click', async () => this.renderUser(user.id));
            listElement.appendChild(listItem);
        });

    }

    async renderUser(userId) {
        const urlSearchParams = new URLSearchParams({w: 120, h: 120});

        //head user info
        const detailHeadInfo = document.querySelector('.detail-head-info');
        const childHeadInfo = detailHeadInfo.querySelector('.detail-head-info-description');
        const childHeadInfoId = `detail-head-info-description-user-${userId}`;
        if (childHeadInfo) {
            if (childHeadInfo.id === childHeadInfoId) {
                return;
            }
            detailHeadInfo.removeChild(childHeadInfo);
        }
        const detailHeadInfoDescription = document.createElement('span');
        detailHeadInfoDescription.className = 'detail-head-info-description';
        detailHeadInfoDescription.id = childHeadInfoId;
        detailHeadInfoDescription.textContent = 'Loading...';
        detailHeadInfo.appendChild(detailHeadInfoDescription);

        const user = await usersListAction.getUserById(userId);
        detailHeadInfoDescription.innerHTML = getUserHeadDetailsInnerHTML(user, urlSearchParams, 'username', 'Username');


        //main user info
        const detailMainInfo = document.querySelector('.detail-main-info');
        const childMainInfo = detailMainInfo.querySelector('.detail-main-info-description');
        const childMainInfoId = `detail-main-info-description-user-${userId}`;
        if (childMainInfo) {
            if (childMainInfo.id === childMainInfoId) {
                return;
            }
            detailMainInfo.removeChild(childMainInfo);
        }
        const detailMainInfoDescription = document.createElement('span');
        detailMainInfoDescription.className = 'detail-main-info-description';
        detailMainInfoDescription.id = childMainInfoId;
        detailMainInfo.appendChild(detailMainInfoDescription);
        detailMainInfoDescription.innerHTML = getUserMainDetailsInnerHTML(user, urlSearchParams);
    }
}

const usersListAction = new UsersListAction("https://jsonplaceholder.typicode.com/users");
const userList = usersListAction.getAllUsers();

userList.then(users => {
    usersListAction.renderUsers(users);
}).catch(err => console.error(err));