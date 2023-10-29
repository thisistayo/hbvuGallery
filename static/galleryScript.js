document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    let year = parseInt(params.get('year'));
    let month = parseInt(params.get('month'));

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month - 1];
    const largeImageContainer = document.getElementById("largeImageContainer");

    document.getElementById("currentMonthYear").innerText = `${monthName} ${year}`;
    document.getElementById("closeIcon").onclick = function() {
        largeImageContainer.style.display = "none";
    };
    
    let endDay = (year == currentYear && month == currentMonth) ? currentDay : new Date(year, month, 0).getDate();
    loadImagesForMonth(year, month, endDay);

    // Navigation arrows
    document.getElementById("prevMonth").addEventListener("click", function(e) {
        e.preventDefault();
        month -= 1;
        if (month <= 0) {
            month = 12;
            year -= 1;
        }
        updateURLAndReload(year, month);
    });

    document.getElementById("nextMonth").addEventListener("click", function(e) {
        e.preventDefault();
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
        updateURLAndReload(year, month);
    });
});

function updateURLAndReload(year, month) {
    window.location.search = `year=${year}&month=${month}`;
}

function loadImagesForMonth(year, month, endDay) {
    document.getElementById("imageGallery").innerHTML = ""; // Clear existing images
    const paddedMonth = String(month).padStart(2, '0');  // Make sure month is always two digits
    for (let i = 1; i <= endDay; i++) {
        const paddedDay = String(i).padStart(2, '0');
        const thumbnailPath = `/static/img/blot/${year}/${paddedMonth}/thumbnails/${paddedDay}.jpeg`;
        createImageCard(thumbnailPath, i, year, month);
    }
}

function createImageCard(thumbnailPath, day, year, month) {
    const paddedDay = String(day).padStart(2, '0');
    
    // Create a Bootstrap card
    const cardDiv = document.createElement("div");
    cardDiv.className = "card mb-3 mr-3"; // Add some margin at the bottom

    // Create image element and add it to the card
    const imgElement = document.createElement("img");
    imgElement.src = thumbnailPath;
    imgElement.alt = `Thumbnail for image ${day} of ${month}-${year}`;
    imgElement.title = "Click to view full size";
    imgElement.className = "card-img-top";

    cardDiv.appendChild(imgElement);

    // Create card body for the label and add it to the card
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body p-2"; // Less padding for compact look
    const dateLabel = document.createElement("p");
    dateLabel.innerText = `${paddedDay}/${month}/${year}`;
    dateLabel.className = "card-text text-center mb-0"; // Centered text, no margin bottom

    cardBodyDiv.appendChild(dateLabel);
    cardDiv.appendChild(cardBodyDiv);

    document.getElementById("imageGallery").appendChild(cardDiv);

    imgElement.onclick = function () {
        const largeImagePath = thumbnailPath.replace('/thumbnails', '');
        document.getElementById('largeImage').src = largeImagePath;
        document.getElementById("largeImageContainer").style.display = "block";
    };
}
