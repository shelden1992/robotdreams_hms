function getUserHeadDetailsInnerHTML(user, urlSearchParams, userAttribute, describeUserAttribute) {
    urlSearchParams.set('r', user.id);
    let details = '';
    if (userAttribute) {
        const attributeValue = userAttribute.includes('.') ?
            user[userAttribute.split('.')[0]][userAttribute.split('.')[1]] :
            user[userAttribute];
        details = `<span>${describeUserAttribute}: ${attributeValue}</span>`;
    }

    return `
        <figure>
            <img src="https://api.lorem.space/image/face?${urlSearchParams.toString()}" alt="user">
            <figcaption>
                <strong>${user.name}</strong>
                ${details}
            </figcaption>
        </figure>
    `;
}

function getUserMainDetailsInnerHTML(user) {
    return `
                <div>
                <span>Company</span>
                <span>${user.company.name}</span>
                </div>
                
                <div>
                <span>Phone</span>
                <span>${user.phone}</span>
                </div>
                
                <div>
                <span>Email</span>
                <span> <a href=\"mailto:${user.email}\">${user.email}</a></span>
                </div>
                
                <div>
                <span>Address</span>
                <span>${user.address.suite}, ${user.address.street}, ${user.address.city} / ${user.address.zipcode}</span>          
                </div>
             
    `;
}