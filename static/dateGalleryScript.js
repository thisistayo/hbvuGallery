document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const [day, month] = params.get('date').split('/');
    const currentYear = new Date().getFullYear();
    const startYear = 2010;  // replace with your starting year

    document.getElementById("dateHeader").innerText = `Photos from ${day}/${month}`;

    // Assuming these elements are in your dateGallery.html
    const largeImageContainer = document.getElementById("largeImageContainer");

    // Previous and Next Date navigation
    document.getElementById("prevDate").addEventListener('click', function (e) {
        e.preventDefault();
        navigateToDate(-1); // Go to the previous day
    });

    document.getElementById("nextDate").addEventListener('click', function (e) {
        e.preventDefault();
        navigateToDate(1); // Go to the next day
    });

    function navigateToDate(offsetDays) {
        const currentDate = new Date(new Date().getFullYear(), month - 1, Number(day) + offsetDays);
        const newDay = String(currentDate.getDate()).padStart(2, '0');
        const newMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        window.location.href = `dateGallery.html?date=${newDay}/${newMonth}`;
    }

    for (let y = startYear; y <= currentYear; y++) {
        const startDate = new Date(2010, 2, 11); // March 10th, 2010
        const endDate = new Date(); // Today

        const currentDate = new Date(y, month - 1, day);
        const paddedMonth = String(month).padStart(2, '0'); // Make sure month is always two digits

        if (currentDate >= startDate && currentDate <= endDate) {
            const imgPath = `/static/img/blot/${y}/${paddedMonth}/thumbnails/${day}.jpeg`;

            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = imgPath;
            img.className = 'card-img-top';
            img.alt = `Image for ${day}/${month}/${y}`;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const cardText = document.createElement('p');
            cardText.className = 'card-text text-center';
            cardText.innerText = y.toString();

            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);

            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-3 card-margin';  // assuming you want 4 cards per row
            colDiv.appendChild(card);

            document.getElementById("dateImageGallery").appendChild(colDiv);
        }
    }
});
