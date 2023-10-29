document.addEventListener("DOMContentLoaded", function () {
    // Load random images on the landing page
    displayRandomImages();

    // Handle the year form submission
    document.getElementById("yearForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const year = document.getElementById("yearInput").value;
        if (year) {
            window.location.href = `/gallery/year.html?year=${year}`; // Note the absolute URL
        }
    });

    // Handle the date form submission
    document.getElementById("dateForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const dateInputValue = document.getElementById('dateInput').value;
        if (dateInputValue) {
            window.location.href = `/gallery/dateGallery.html?date=${dateInputValue}`; // Note the absolute URL
        }
    });
});

function displayRandomImages() {
    const startDate = new Date(2011, 0, 1); // March 10th, 2010
    const endDate = new Date(); // Today

    const mainContainer = document.getElementById('randomImagesContainer');
    if(!mainContainer) return;

    const numberOfImagesToDisplay = 4;

    for (let i = 0; i < numberOfImagesToDisplay; i++) {
        const randomYear = Math.floor(Math.random() * (new Date().getFullYear() - 2011 + 1)) + 2011;
        const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

        const randomDate = new Date(randomYear, randomMonth - 1, randomDay);

        if (randomDate >= startDate && randomDate <= endDate) {
            const imagePath = `/static/img/blot/${randomYear}/${randomMonth}/thumbnails/${randomDay}.jpeg`;


            // Create a Bootstrap column
            const columnDiv = document.createElement("div");
            columnDiv.className = "col-sm-3"; // This ensures each image takes up 1/4 of the row on small screens and up.

            // Create a Bootstrap card
            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            // Create image element and add it to the card
            const imgElement = document.createElement("img");
            imgElement.src = imagePath;
            imgElement.alt = `Random Image for ${randomDay}/${randomMonth}/${randomYear}`;
            imgElement.className = "card-img-top";
            cardDiv.appendChild(imgElement);

            // Create card body for the label and add it to the card
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.className = "card-body";
            const dateLabel = document.createElement("p");
            dateLabel.innerText = `${randomYear}`;
            dateLabel.className = "card-text";
            cardBodyDiv.appendChild(dateLabel);
            cardDiv.appendChild(cardBodyDiv);

            // Append the card to the column and then to the main container
            columnDiv.appendChild(cardDiv);
            mainContainer.appendChild(columnDiv);
        }
    }
}
