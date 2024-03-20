function getImgUserInnerHTML(speaker, speakerSearchParams) {
    speakerSearchParams.set('r', speaker.id);
    return `
        <figure>
            <img src="https://api.lorem.space/image/face?${speakerSearchParams.toString()}" alt="user">
            <figcaption>
                <strong>${speaker.lastName} ${speaker.firstName}</strong>
                <span>${speaker.company.title} at ${speaker.company.name}</span>
            </figcaption>
        </figure>
    `;
}

function getSpeakersScheduleInfoInnerHtml(speaker, speechTheme, timeStartAndFinish) {
    return `
        <div>
                <strong>${speaker.lastName} ${speaker.firstName}</strong>            
                <span>${speechTheme}</span>
                <span class="schedule-inform-time">${timeStartAndFinish} PST</span>
        </div>
    `;
}

