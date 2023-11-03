document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    let year = parseInt(params.get('year')); // Parse year as an integer
    const month = params.get('month'); // Retrieve the month if needed

    document.getElementById("headerTitle").innerText = `Photos from ${year}`;

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthsContainer = document.getElementById("months");

    // Navigation arrows
    document.getElementById("prevYear").addEventListener("click", function (e) {
        e.preventDefault();
        if (year > 2010) {
            year -= 1;
            updateURLAndReload(year, month);
        }
    });

    document.getElementById("nextYear").addEventListener("click", function (e) {
        e.preventDefault();
        if (year < 2023) {
            year += 1;
            updateURLAndReload(year, month);
        }
    });

    monthNames.forEach((month, index) => {
        const startDate = new Date(2010, 2, 11); // March 10th, 2010
        const endDate = new Date(); // Today
        const currentDate = new Date(year, index, 1); // 1st day of the month

        if (currentDate >= startDate && currentDate <= endDate) {
            const monthNumber = (index + 1).toString().padStart(2, '0');
            const imgPath = `/static/img/blot/${year}/${monthNumber}/01.jpeg`;

            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = imgPath;
            img.className = 'card-img-top';
            img.alt = `${month} thumbnail`;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardText = document.createElement('p');
            cardText.className = 'card-text text-center';
            cardText.innerText = month;

            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);

            // Creating the anchor tag to wrap the card.
            const cardLink = document.createElement('a');
            cardLink.href = `gallery.html?year=${year}&month=${monthNumber}`;
            cardLink.appendChild(card);

            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-3 card-margin';
            colDiv.appendChild(cardLink);

            monthsContainer.appendChild(colDiv);
        }
    });
});

function updateURLAndReload(year, month) {
    // Construct the new URL based on the year and optionally the month
    let newURL = `/gallery/year.html?year=${year}`;
    if (month) {
        newURL += `&month=${month}`;
    }
    
    // Redirect to the new URL
    window.location.href = newURL;
}
