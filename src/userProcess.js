class UserProcess {
    #departmentDateSpeechClassNameElementList;
    #speechThemesList;
    #timeSpeech;

    constructor(url) {
        this.url = url;

        this.#departmentDateSpeechClassNameElementList = new Map();
        this.#speechThemesList = new Map();
        this.#timeSpeech = ['9:00AM - 10:00AM', '10:00AM - 11:00AM', '11:00AM - 12:00PM', '1:00PM - 2:00PM', '3:00PM - 4:00PM', '4:00PM - 5:00PM', '5:00PM - 6:00PM'];

        const classNameOfDateSpeechList4 = '.speakers-list-4-date';
        const classNameOfDateSpeechList5 = '.speakers-list-5-date';
        const classNameOfDateSpeechList6 = '.speakers-list-6-date';

        const userDepartment = {
            'Engineering': classNameOfDateSpeechList4,
            'Business Development': classNameOfDateSpeechList4,
            'Sales': classNameOfDateSpeechList5,
            'Legal': classNameOfDateSpeechList5,
            'Product Management': classNameOfDateSpeechList6
        }

        this.#speechThemesList.set(classNameOfDateSpeechList4, ['Not so one-time payments', 'The finer print', 'The invisible card reader', 'Stealing fingerprints', 'Voting machines']);
        this.#speechThemesList.set(classNameOfDateSpeechList5, ['Neuralink dark patterns', 'DALL-E for passports', 'Quantum password cracking', 'Knowing the game and playing it']);
        this.#speechThemesList.set(classNameOfDateSpeechList6, ['Presentation: Leveraging CNAPP to close the cloud security expertise gap', 'Presentation: Role of cyber security in mergers & acquisitions', 'Panel: Never trust, always verify: The Zero-Trust approach', 'Knowing the game and playing it']);

        Object.entries(userDepartment).forEach(([department, selector]) => {
            this.#departmentDateSpeechClassNameElementList.set(department, selector);
        });
    }

    async getAllUsers() {
        try {
            const userList = await fetch(this.url);
            if (userList.ok) {
                return userList.json();
            }
        } catch (err) {
            console.log(err);
        }
        return [];
    }

    groupUsersByDepartment(userList) {
        const departmentUserMap = new Map();
        userList.forEach(user => {
            const department = user.company.department;
            const departmentUserList = departmentUserMap.get(department);

            if (departmentUserList) {
                departmentUserList.push(user);
            } else {
                departmentUserMap.set(department, [user]);
            }
        })

        return departmentUserMap;
    }

    groupUsersByDateSpeechClassNameOfElementList(usersGroupedByDepartment) {
        const dateSpeechClassNameOfElementListWithUserList = new Map();
        usersGroupedByDepartment.forEach((userList, department) => {
                const dateSpeechUlElement = this.#departmentDateSpeechClassNameElementList.get(department);

                if (dateSpeechUlElement) {
                    const userListInCurrentDay = dateSpeechClassNameOfElementListWithUserList.get(dateSpeechUlElement);
                    if (userListInCurrentDay) {
                        dateSpeechClassNameOfElementListWithUserList.set(dateSpeechUlElement, [...userListInCurrentDay, ...userList]);
                    } else {
                        dateSpeechClassNameOfElementListWithUserList.set(dateSpeechUlElement, userList);
                    }
                }

            }
        )
        return new Map([...dateSpeechClassNameOfElementListWithUserList.entries()].sort());
    }

    renderImageUsers(usersGroupedByDateSpeech) {
        if (usersGroupedByDateSpeech.size > 0) {
            const userSearchParams = new URLSearchParams({w: 120, h: 120});
            const userImgList = document.querySelector('.speakers-list');
            usersGroupedByDateSpeech.forEach((userList) => {
                userList.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'Loading...'
                    userImgList.appendChild(listItem);
                    listItem.innerHTML = getImgUserInnerHTML(user, userSearchParams);
                });
            });
        }
        return usersGroupedByDateSpeech;
    }

    renderSpeakersScheduleInfo(usersGroupedByDateSpeech) {
        if (usersGroupedByDateSpeech.size > 0) {
            usersGroupedByDateSpeech.forEach((userList, dateSpeechClassNameOfElementList) => {
                userList.forEach((user, index) => {
                    const userListUlElement = document.querySelector(dateSpeechClassNameOfElementList);
                    const listItem = document.createElement('li');
                    listItem.textContent = 'Loading...'
                    userListUlElement.appendChild(listItem);
                    const departmentThemes = this.#speechThemesList.get(dateSpeechClassNameOfElementList);
                    listItem.innerHTML = getSpeakersScheduleInfoInnerHtml(user, departmentThemes[Math.floor(Math.random() * departmentThemes.length)], this.#timeSpeech[index]);
                });
            });
        }
    }
}


const userProcess = new UserProcess("https://dummyjson.com/users");
const allUsers = userProcess.getAllUsers();

allUsers
    .then(users => userProcess.groupUsersByDepartment(users.users))
    .then(usersGroupedByDepartment => userProcess.groupUsersByDateSpeechClassNameOfElementList(usersGroupedByDepartment))
    .then(usersGroupedByDateSpeech => userProcess.renderImageUsers(usersGroupedByDateSpeech))
    .then(usersGroupedByDateSpeech => userProcess.renderSpeakersScheduleInfo(usersGroupedByDateSpeech))

