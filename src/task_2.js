function UserListAction2(url) {
    this.baseUrl = url;
}

UserListAction2.prototype.getAllUsers = async function () {
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

UserListAction2.prototype.groupUsersByCity = function (userList) {

    return userList.reduce((grouped, user) => {
        const city = user.address.city;

        if (!grouped[city]) {
            grouped[city] = [];
        }

        grouped[city].push({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                companyName: user.company.name
            }
        )

        return grouped;
    }, []);
}

UserListAction2.prototype.sortUsersByName = function (grouped) {
    function sortUsers(city) {
        grouped[city].sort((user, userNext) => {
            if (user.name < userNext.name) {
                return -1;
            }
            if (user.name > userNext.name) {
                return 1;
            }
            return 0;
        });
    }

    for (let city in grouped) {
        sortUsers(city);
    }

    return grouped;
}


// ID, name, phone
UserListAction2.prototype.restrictUserData = function (grouped) {
    const groupedWithRestrictedUserData = {};

    for (let city in grouped) {
        const users = grouped[city];

        groupedWithRestrictedUserData[city] = users.map(user => {
            const {companyName, email, ...newUser} = user;
            return newUser;
        })

    }

    return groupedWithRestrictedUserData;
}


const userListAction = new UserListAction2("https://jsonplaceholder.typicode.com/users");
const usersList = userListAction.getAllUsers();

usersList
    .then(users => userListAction.groupUsersByCity(users))
    .then(usersGroupByCity => userListAction.sortUsersByName(usersGroupByCity))
    .then(usersSortByName => console.log(userListAction.restrictUserData(usersSortByName)));