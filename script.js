document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const resultsTable = document.getElementById("resultsTable");

    addButton.addEventListener("click", function() {
        const name = document.getElementById("name").value;
        const score = parseInt(document.getElementById("score").value);

        // Send data to the server using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "add_student.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    updateTable();
                } else {
                    console.error("Failed to add student.");
                }
            }
        };
        xhr.send(`name=${name}&score=${score}`);
    });

    function updateTable() {
        // Fetch data from the server using AJAX
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "get_students.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resultsTable.innerHTML = "";
                    data.forEach(function(student) {
                        const grade = calculateGrade(student.score);
                        resultsTable.innerHTML += `
                            <tr>
                                <td>${student.id}</td>
                                <td>${student.name}</td>
                                <td>${student.score}</td>
                                <td>${grade}</td>
                            </tr>`;
                    });
                } else {
                    console.error("Failed to fetch student data.");
                }
            }
        };
        xhr.send();
    }

    function calculateGrade(score) {
        if (score >= 90) {
            return "A";
        } else if (score >= 80) {
            return "B";
        } else if (score >= 70) {
            return "C";
        } else if (score >= 60) {
            return "D";
        } else {
            return "F";
        }
    }

    updateTable();
});
